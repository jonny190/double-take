const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

// isolate storage before anything pulls in config (constants is memoized on
// first require, same pattern as the other test files in this suite)
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const { validate, Joi } = require('../src/middlewares');

// Express 5 exposes req.query as an accessor (get-only, re-parsed from
// req.url on every access) rather than the plain writable property it was in
// Express 4. Reproduce that shape here rather than using a plain object,
// since a plain object would not catch the regression this test guards
// against: `req.query = value` silently no-ops against a getter-only
// property instead of throwing, so the bug shows up only when the property
// is genuinely non-writable like it is on a real Express 5 request.
const makeExpress5StyleRequest = (queryString) => {
  const req = { url: `/?${queryString}`, body: {}, params: {} };
  Object.defineProperty(req, 'query', {
    get() {
      return Object.fromEntries(new URLSearchParams(queryString));
    },
    enumerable: true,
    configurable: true,
  });
  return req;
};

test('validate: query defaults survive on an Express-5-style (getter-only) req.query', async () => {
  const req = makeExpress5StyleRequest('url=http://example.com/x.jpg&camera=oz');
  const res = {
    status() {
      return this;
    },
    send() {},
  };
  let nextCalled = false;

  await validate({
    query: {
      url: Joi.string().uri().required(),
      camera: Joi.string().default('manual'),
      attempts: Joi.number().integer().default(1).min(1).max(100),
    },
  })(req, res, () => {
    nextCalled = true;
  });

  assert.ok(nextCalled, 'next() was called (validation passed)');
  // this is the regression: on Express 5, `req.query = value` inside the
  // validate middleware silently discards Joi's defaulted/coerced values
  // because req.query has no setter, so callers that omit an optional query
  // param (e.g. GET /api/recognize without &attempts=) never get the
  // documented default and downstream code sees `undefined` instead of `1`.
  assert.strictEqual(req.query.attempts, 1, 'Joi default for `attempts` was applied to req.query');
  assert.strictEqual(req.query.camera, 'oz', 'explicitly provided query values are preserved');
});

test('validate: query validation errors still short-circuit with 422', async () => {
  const req = makeExpress5StyleRequest('url=http://example.com/x.jpg&attempts=999999');
  let statusCode;
  let body;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    send(payload) {
      body = payload;
    },
  };
  let nextCalled = false;

  await validate({
    query: {
      url: Joi.string().uri().required(),
      attempts: Joi.number().integer().default(1).min(1).max(100),
    },
  })(req, res, () => {
    nextCalled = true;
  });

  assert.strictEqual(nextCalled, false, 'next() was not called on validation failure');
  assert.strictEqual(statusCode, 422);
  assert.ok(Array.isArray(body.errors));
});
