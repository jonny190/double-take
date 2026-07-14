const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const request = require('supertest');

// auth enabled: exercise JWT enforcement and the login flow.
// Set up an isolated temp storage dir with auth on before requiring the app.
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(path.join(base, 'config', 'config.yml'), yaml.dump({ auth: true }));
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const app = require('../src/app');
const { auth } = require('../src/util/auth.util');

// seed a password before the app handles requests
auth.set({ password: 'test123' });

test('protected route without a token is 401', async () => {
  const res = await request(app).get('/api/config/secrets');
  assert.strictEqual(res.status, 401);
});

test('protected route with a bad token is 401', async () => {
  const res = await request(app).get('/api/config/secrets').set('authorization', 'garbage');
  assert.strictEqual(res.status, 401);
});

test('login with correct password issues a working token', async () => {
  const login = await request(app).post('/api/auth').send({ password: 'test123' });
  assert.strictEqual(login.status, 200);
  assert.ok(login.body.token);

  const res = await request(app).get('/api/config/secrets').set('authorization', login.body.token);
  assert.strictEqual(res.status, 200);
});

test('login with wrong password is 401', async () => {
  const res = await request(app).post('/api/auth').send({ password: 'nope' });
  assert.strictEqual(res.status, 401);
});
