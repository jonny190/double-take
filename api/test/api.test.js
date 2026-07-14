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
