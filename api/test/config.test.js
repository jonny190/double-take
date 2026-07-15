const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

// isolate storage and seed a config that references a secret, plus the secrets
// file it resolves against — set up before requiring the (memoized) loader.
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
const configDir = path.join(base, 'config');
fs.mkdirSync(configDir, { recursive: true });
fs.writeFileSync(
  path.join(configDir, 'config.yml'),
  [
    'detectors:',
    '  compreface:',
    '    url: http://localhost:8000',
    '    key: !secret compreface_key',
    '',
  ].join('\n')
);
fs.writeFileSync(path.join(configDir, 'secrets.yml'), 'compreface_key: supersecret\n');
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = configDir;
process.env.SECRETS_PATH = configDir;
process.env.MEDIA_PATH = base;

const config = require('../src/constants/config');
const redact = require('../src/util/redact-secrets.util');

test('config: resolves !secret references from the secrets file', () => {
  assert.strictEqual(config().detectors.compreface.key, 'supersecret');
});

test('config: merges detector + detect defaults into user config', () => {
  const c = config();
  // detect defaults are merged in even though the user config omitted them
  assert.strictEqual(c.detect.match.confidence, 60);
  assert.strictEqual(c.detect.unknown.confidence, 40);
  // detector defaults (timeout) merged onto the configured detector
  assert.strictEqual(c.detectors.compreface.timeout, 15);
});

test('config: is memoized (same reference on repeat calls)', () => {
  assert.strictEqual(config(), config());
});

test('redact-secrets: masks the resolved secret in the loaded config', () => {
  const out = redact(config());
  assert.strictEqual(out.detectors.compreface.key, '********');
  assert.strictEqual(out.detectors.compreface.url, 'http://localhost:8000');
});
