const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Point the app at an isolated temp storage dir before anything pulls in
// constants (config is memoized on first load; auth.util reads it).
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const DigestAuth = require('../src/util/digest.util');

const { md5, parseChallenge } = DigestAuth;
const { jwt } = require('../src/util/auth.util');
const { tryParseJSON } = require('../src/util/validators.util');
const redact = require('../src/util/redact-secrets.util');

test('digest: RFC 2617 response test vector', () => {
  const ha1 = md5('Mufasa:testrealm@host.com:Circle Of Life');
  const ha2 = md5('GET:/dir/index.html');
  const response = md5(`${ha1}:dcd98b7102dd2f0e8b11d0f600bfb0c093:00000001:0a4f113b:auth:${ha2}`);
  assert.strictEqual(response, '6629fae49393a05397450978507c4ef1');
});

test('digest: parseChallenge extracts directives and prefers qop=auth', () => {
  const c = parseChallenge(
    'Digest realm="testrealm@host.com", qop="auth,auth-int", nonce="abc", opaque="xyz"'
  );
  assert.strictEqual(c.realm, 'testrealm@host.com');
  assert.strictEqual(c.qop, 'auth');
  assert.strictEqual(c.nonce, 'abc');
  assert.strictEqual(c.opaque, 'xyz');
});

test('digest: authorization header is well-formed', () => {
  const da = new DigestAuth({ username: 'u', password: 'p' });
  const header = da.authorization(
    { realm: 'r', nonce: 'n', qop: 'auth', opaque: 'o' },
    'GET',
    'http://host/cam/image.jpg?x=1'
  );
  assert.ok(header.startsWith('Digest username="u"'));
  assert.ok(header.includes('uri="/cam/image.jpg?x=1"'));
  assert.ok(header.includes('qop=auth'));
  assert.ok(/nc=00000001/.test(header));
  assert.ok(header.includes('opaque="o"'));
});

test('jwt: sign/verify round-trip and rejects tampering', () => {
  const token = jwt.sign({ route: 'storage' });
  assert.strictEqual(jwt.verify(token), true);
  assert.strictEqual(jwt.decode(token).route, 'storage');
  assert.strictEqual(jwt.verify(`${token}tampered`), false);
});

test('validators: tryParseJSON returns object or false', () => {
  assert.deepStrictEqual(tryParseJSON('{"a":1}'), { a: 1 });
  assert.strictEqual(tryParseJSON('not json'), false);
  assert.strictEqual(tryParseJSON('"a string"'), false);
});

test('redact-secrets: masks sensitive keys, leaves others', () => {
  const out = redact({ password: 'hunter2', apiKey: 'abc', token: 't', camera: 'front' });
  assert.strictEqual(out.password, '********');
  assert.strictEqual(out.apiKey, '********');
  assert.strictEqual(out.token, '********');
  assert.strictEqual(out.camera, 'front');
});
