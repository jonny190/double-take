const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');

// isolate storage with the HTTP detectors configured before requiring them
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(
  path.join(base, 'config', 'config.yml'),
  yaml.dump({
    detectors: {
      compreface: { url: 'http://localhost:8000', key: 'k' },
      deepstack: { url: 'http://localhost:5000' },
      facebox: { url: 'http://localhost:8080' },
    },
  })
);
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const compreface = require('../src/util/detectors/compreface');
const deepstack = require('../src/util/detectors/deepstack');
const facebox = require('../src/util/detectors/facebox');
const rekognition = require('../src/util/detectors/rekognition');

const box = { top: 0, left: 0, width: 100, height: 100 };

test('compreface: normalize maps a confident subject to a match', () => {
  const out = compreface.normalize({
    camera: 'test',
    data: {
      result: [
        {
          subjects: [{ subject: 'Bob', similarity: 0.95 }],
          box: { x_min: 0, y_min: 0, x_max: 100, y_max: 100 },
        },
      ],
    },
  });
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'bob');
  assert.strictEqual(out[0].confidence, 95);
  assert.strictEqual(out[0].match, true);
  assert.deepStrictEqual(out[0].box, box);
});

test('compreface: normalize returns [] when no face is found (code 28)', () => {
  assert.deepStrictEqual(compreface.normalize({ camera: 'test', data: { code: 28 } }), []);
});

test('deepstack: normalize maps a confident prediction to a match', () => {
  const out = deepstack.normalize({
    camera: 'test',
    data: {
      success: true,
      predictions: [
        { userid: 'Bob', confidence: 0.95, x_min: 0, y_min: 0, x_max: 100, y_max: 100 },
      ],
    },
  });
  assert.strictEqual(out[0].name, 'bob');
  assert.strictEqual(out[0].confidence, 95);
  assert.strictEqual(out[0].match, true);
  assert.deepStrictEqual(out[0].box, box);
});

test('deepstack: normalize returns [] on an unsuccessful response', () => {
  assert.deepStrictEqual(deepstack.normalize({ camera: 'test', data: { success: false } }), []);
});

test('facebox: normalize maps a matched face to a match', () => {
  const out = facebox.normalize({
    camera: 'test',
    data: {
      success: true,
      faces: [
        {
          confidence: 0.95,
          matched: true,
          name: 'Bob',
          rect: { top: 0, left: 0, width: 100, height: 100 },
        },
      ],
    },
  });
  assert.strictEqual(out[0].name, 'bob');
  assert.strictEqual(out[0].confidence, 95);
  assert.strictEqual(out[0].match, true);
  assert.deepStrictEqual(out[0].box, box);
});

test('rekognition: normalize returns [] when no faces are detected', () => {
  const out = rekognition.normalize({
    camera: 'test',
    data: { error: 'no faces detected', $metadata: { httpStatusCode: 400 } },
  });
  assert.deepStrictEqual(out, []);
});

test('rekognition: normalize falls back to an unknown box when unmatched', () => {
  const out = rekognition.normalize({
    camera: 'test',
    data: {
      $metadata: { httpStatusCode: 200 },
      FaceMatches: [],
      SearchedFaceBoundingBox: { Top: 0.1, Left: 0.1, Width: 0.5, Height: 0.5 },
      source: { width: 1000, height: 1000 },
    },
  });
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'unknown');
  assert.strictEqual(out[0].match, false);
  assert.deepStrictEqual(out[0].box, { top: 100, left: 100, width: 500, height: 500 });
});
