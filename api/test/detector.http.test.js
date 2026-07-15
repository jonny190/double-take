const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');

// Configure all HTTP detectors, then intercept axios at the adapter layer so
// each detector's outgoing request (URL, method, auth) is asserted without a
// network or a mock server. Covers the request-building half of the detectors;
// normalize() is covered separately in detectors.test.js.
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(
  path.join(base, 'config', 'config.yml'),
  yaml.dump({
    detectors: {
      compreface: { url: 'http://compreface:8000', key: 'cf-key' },
      codeprojectai: { url: 'http://cpai:32168', key: 'cpai-key' },
      deepstack: { url: 'http://deepstack:5000', key: 'ds-key' },
      facebox: { url: 'http://facebox:8080' },
    },
  })
);
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

// a real image file for the detectors that stream one
const imagePath = path.join(base, 'face.jpg');
fs.writeFileSync(imagePath, Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]));

// capture the last request axios was asked to make and short-circuit it
let lastRequest = null;
axios.defaults.adapter = async (requestConfig) => {
  lastRequest = requestConfig;
  return {
    data: { ok: true },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: requestConfig,
  };
};

const compreface = require('../src/util/detectors/compreface');
const codeprojectai = require('../src/util/detectors/codeprojectai');
const deepstack = require('../src/util/detectors/deepstack');
const facebox = require('../src/util/detectors/facebox');

const headerValue = (headers, name) => {
  // axios may hand the adapter a plain object or an AxiosHeaders instance
  if (!headers) return undefined;
  if (typeof headers.get === 'function') return headers.get(name);
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : undefined;
};

test('compreface recognize: posts to the recognition endpoint with the api key', async () => {
  await compreface.recognize({ key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.ok(lastRequest.url.startsWith('http://compreface:8000/api/v1/recognition/recognize'));
  assert.strictEqual(headerValue(lastRequest.headers, 'x-api-key'), 'cf-key');
});

test('compreface train: posts to the faces endpoint with the subject', async () => {
  await compreface.train({ name: 'alice', key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.strictEqual(lastRequest.url, 'http://compreface:8000/api/v1/recognition/faces');
  assert.strictEqual(lastRequest.params.subject, 'alice');
});

test('compreface remove: deletes the subject', async () => {
  await compreface.remove({ name: 'alice' });
  assert.strictEqual(lastRequest.method, 'delete');
  assert.strictEqual(lastRequest.url, 'http://compreface:8000/api/v1/recognition/faces');
  assert.strictEqual(lastRequest.params.subject, 'alice');
});

test('codeprojectai recognize: posts to the vision recognize endpoint', async () => {
  await codeprojectai.recognize({ key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.strictEqual(lastRequest.url, 'http://cpai:32168/v1/vision/face/recognize');
});

test('codeprojectai train: posts to the register endpoint', async () => {
  await codeprojectai.train({ name: 'bob', key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.strictEqual(lastRequest.url, 'http://cpai:32168/v1/vision/face/register');
});

test('deepstack recognize: posts to the vision recognize endpoint', async () => {
  await deepstack.recognize({ key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.strictEqual(lastRequest.url, 'http://deepstack:5000/v1/vision/face/recognize');
});

test('facebox recognize: posts to the check endpoint', async () => {
  await facebox.recognize({ key: imagePath });
  assert.strictEqual(lastRequest.method, 'post');
  assert.strictEqual(lastRequest.url, 'http://facebox:8080/facebox/check');
});

test('facebox remove: deletes the named teaching', async () => {
  await facebox.remove({ name: 'carol' });
  assert.strictEqual(lastRequest.method, 'delete');
  assert.strictEqual(lastRequest.url, 'http://facebox:8080/facebox/teach/carol');
});
