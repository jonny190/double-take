const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');

// isolate storage with a codeprojectai detector configured before requiring it
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(
  path.join(base, 'config', 'config.yml'),
  yaml.dump({ detectors: { codeprojectai: { url: 'http://localhost:32168' } } })
);
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const codeprojectai = require('../src/util/detectors/codeprojectai');

test('codeprojectai: registered in the detector index', () => {
  const detectors = require('../src/util/detectors');
  assert.strictEqual(typeof detectors.codeprojectai.recognize, 'function');
});

test('codeprojectai: normalize maps a confident prediction to a match', () => {
  const out = codeprojectai.normalize({
    camera: 'test',
    data: {
      success: true,
      predictions: [
        { userid: 'Alice', confidence: 0.9, x_min: 0, y_min: 0, x_max: 100, y_max: 100 },
      ],
    },
  });
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'alice'); // lowercased, above unknown threshold
  assert.strictEqual(out[0].confidence, 90);
  assert.strictEqual(out[0].match, true); // >= match confidence and min area
  assert.deepStrictEqual(out[0].box, { top: 0, left: 0, width: 100, height: 100 });
});

test('codeprojectai: normalize returns [] on an unsuccessful response', () => {
  assert.deepStrictEqual(codeprojectai.normalize({ camera: 'test', data: { success: false } }), []);
});
