const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const request = require('supertest');

// auth disabled: exercise routing, validation guards and rate limiting.
// Set up an isolated temp storage dir before requiring the app.
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(path.join(base, 'config', 'config.yml'), yaml.dump({ auth: false }));
fs.mkdirSync(path.join(base, 'train'), { recursive: true });
fs.mkdirSync(path.join(base, 'matches'), { recursive: true });
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const app = require('../src/app');

test('unknown API route returns 404', async () => {
  const res = await request(app).get('/api/does-not-exist');
  assert.strictEqual(res.status, 404);
  assert.ok(res.body.error);
});

test('config/theme returns theme + editor', async () => {
  const res = await request(app).get('/api/config/theme');
  assert.strictEqual(res.status, 200);
  assert.ok('theme' in res.body);
  assert.ok('editor' in res.body);
});

test('path-traversal guard rejects separators in filename (422)', async () => {
  // %5C decodes to a backslash, which the safeName validator rejects
  const res = await request(app).get('/api/storage/matches/foo%5Cbar');
  assert.strictEqual(res.status, 422);
  assert.ok(Array.isArray(res.body.errors));
});

test('valid filename passes validation and reaches controller (400 missing)', async () => {
  const res = await request(app).get('/api/storage/matches/none.jpg');
  assert.strictEqual(res.status, 400); // reaches controller, file does not exist
});

test('filesystem/image routes carry rate-limit headers', async () => {
  const res = await request(app).get('/api/storage/matches/none.jpg');
  assert.ok(res.headers['ratelimit-policy'] || res.headers.ratelimit, 'RateLimit header present');
});

test('folders list returns an array', async () => {
  const res = await request(app).get('/api/filesystem/folders');
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
});

test('tmp static route serves the URL shape built by mqtt/upload processing', async () => {
  // mqtt.util and recognize.controller hand the API a self-referential URL of
  // the form /api<STORAGE.TMP.PATH>/<file>; Express 5 will not match the mount
  // if that join produces a double slash, silently breaking snapshot and
  // manual-upload processing
  const { STORAGE } = require('../src/constants')();
  fs.mkdirSync(STORAGE.TMP.PATH, { recursive: true });
  const filename = 'route-shape-test.jpg';
  fs.writeFileSync(path.join(STORAGE.TMP.PATH, filename), 'not-really-a-jpg');
  try {
    const res = await request(app).get(`/api${STORAGE.TMP.PATH}/${filename}`);
    assert.strictEqual(res.status, 200);
  } finally {
    fs.rmSync(path.join(STORAGE.TMP.PATH, filename), { force: true });
  }
});

test('malformed JSON body does not leak error internals', async () => {
  const res = await request(app)
    .post('/api/recognize')
    .set('content-type', 'application/json')
    .send('{ not valid json');
  assert.strictEqual(res.status, 400);
  // the body must be exactly the sanitized shape, not the raw error object
  // (which serializes the request body, type, and other internals)
  assert.deepStrictEqual(Object.keys(res.body), ['error']);
  assert.ok(!('body' in res.body) && !('type' in res.body));
});

test('no CORS header is sent in production', async () => {
  // NODE_ENV is unset in tests, so the header should be present here; assert
  // the app opts out under production instead
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  delete require.cache[require.resolve('../src/app')];
  const prodApp = require('../src/app');
  try {
    const res = await request(prodApp)
      .get('/api/config/theme')
      .set('origin', 'http://evil.example');
    assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
  } finally {
    process.env.NODE_ENV = original;
    delete require.cache[require.resolve('../src/app')];
  }
});

test('the SSRF-prone proxy endpoint is removed', async () => {
  const res = await request(app).get('/api/proxy?url=http://169.254.169.254/');
  assert.strictEqual(res.status, 404);
});

test('security headers are sent (helmet)', async () => {
  const res = await request(app).get('/api/config/theme');
  // a couple of representative helmet defaults
  assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
  assert.ok(res.headers['x-dns-prefetch-control'], 'helmet headers present');
  // relaxed CORP so HA can embed images cross-origin
  assert.strictEqual(res.headers['cross-origin-resource-policy'], 'cross-origin');
  // a CSP is enforced (not disabled), with a per-request nonce for scripts
  const csp = res.headers['content-security-policy'];
  assert.ok(csp, 'CSP header present');
  assert.ok(/script-src[^;]*'nonce-/.test(csp), 'script-src carries a nonce');
  assert.ok(/frame-ancestors 'self'/.test(csp), 'frame-ancestors set');
});

test('the injected bootstrap script carries the CSP nonce', async () => {
  const distDir = path.join(process.cwd(), 'frontend', 'dist');
  const indexPath = path.join(distDir, 'index.html');
  const hadIndex = fs.existsSync(indexPath);
  if (!hadIndex) {
    fs.mkdirSync(distDir, { recursive: true });
    fs.writeFileSync(indexPath, '<html><head></head><body></body></html>');
  }
  try {
    const res = await request(app).get('/');
    const headerNonce = (res.headers['content-security-policy'].match(/'nonce-([^']+)'/) || [])[1];
    assert.ok(headerNonce, 'nonce present in CSP header');
    assert.ok(
      res.text.includes(`<script nonce="${headerNonce}">`),
      'injected script uses the same nonce'
    );
  } finally {
    if (!hadIndex) fs.rmSync(indexPath, { force: true });
  }
});

test('recognize GET caps attempts (rejects an absurd value)', async () => {
  const res = await request(app).get('/api/recognize?url=http://x/y.jpg&attempts=999999');
  assert.strictEqual(res.status, 422);
  assert.ok(Array.isArray(res.body.errors));
});

test('recognize GET blocks cloud-metadata SSRF targets', async () => {
  // passes Joi (valid uri) but the fetch layer must refuse the metadata IP;
  // with no detectors configured it would 400 "no detectors" AFTER routing,
  // so assert the process.util guard directly
  const process = require('../src/util/process.util');
  const valid = await process.isValidURL({
    type: 'test',
    url: 'http://169.254.169.254/latest/meta-data/',
  });
  assert.strictEqual(valid, false);
  const streamed = await process.stream('http://metadata.google.internal/computeMetadata/v1/');
  assert.strictEqual(streamed, undefined);
});
