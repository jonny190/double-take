const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');

// Enable MQTT (with the default topics) and Home Assistant discovery, then
// capture what mqtt.recognize() publishes. This is the payload-building side
// of the MQTT integration - the shape Home Assistant consumes - exercised
// without a broker.
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-test-'));
fs.mkdirSync(path.join(base, 'config'), { recursive: true });
fs.writeFileSync(
  path.join(base, 'config', 'config.yml'),
  yaml.dump({ mqtt: { host: 'localhost' } })
);
process.env.STORAGE_PATH = base;
process.env.CONFIG_PATH = path.join(base, 'config');
process.env.SECRETS_PATH = path.join(base, 'config');
process.env.MEDIA_PATH = base;

const mqtt = require('../src/util/mqtt.util');

// capture publishes instead of sending them to a broker
let published = [];
mqtt.publish = (data) => {
  published = published.concat(Array.isArray(data) ? data : [data]);
};

const topics = () => published.map((m) => m.topic);
const byTopic = (t) => published.find((m) => m.topic === t);

const baseOutput = (overrides = {}) => ({
  id: 'evt-1',
  duration: 1.2,
  timestamp: '2026-07-15T00:00:00.000Z',
  attempts: 3,
  camera: 'front-door',
  zones: [],
  counts: { person: 1, match: 0, miss: 0, unknown: 0 },
  matches: [],
  misses: [],
  unknowns: [],
  ...overrides,
});

test('recognize: with no results only the person-count topic fires', () => {
  published = [];
  mqtt.recognize(baseOutput({ counts: { person: 0, match: 0, miss: 0, unknown: 0 } }));
  assert.deepStrictEqual(topics(), ['double-take/cameras/front-door/person']);
});

test('recognize: publishes the per-camera person count', () => {
  published = [];
  mqtt.recognize(baseOutput());
  const personTopic = byTopic('double-take/cameras/front-door/person');
  assert.ok(personTopic, 'person-count topic published');
  assert.strictEqual(personTopic.message, '1');
  assert.strictEqual(personTopic.retain, true);
});

test('recognize: a match publishes the match topic and HA discovery', () => {
  published = [];
  mqtt.recognize(
    baseOutput({
      counts: { person: 1, match: 1, miss: 0, unknown: 0 },
      matches: [{ name: 'david', confidence: 99, box: { top: 0, left: 0, width: 10, height: 10 } }],
    })
  );
  assert.ok(byTopic('double-take/matches/david'), 'match topic by name');
  assert.ok(
    byTopic('homeassistant/sensor/double-take/david/config'),
    'HA discovery config for the matched name'
  );
  assert.ok(byTopic('double-take/cameras/front-door'), 'per-camera summary topic');

  const config = JSON.parse(byTopic('homeassistant/sensor/double-take/david/config').message);
  assert.strictEqual(config.name, 'double_take_david');
  assert.strictEqual(config.unique_id, 'double_take_david');
});

test('recognize: an unknown publishes the unknown topic', () => {
  published = [];
  mqtt.recognize(
    baseOutput({
      counts: { person: 1, match: 0, miss: 0, unknown: 1 },
      unknowns: [{ name: 'unknown', confidence: 20, box: { top: 0, left: 0, width: 5, height: 5 } }],
    })
  );
  assert.ok(byTopic('double-take/matches/unknown'), 'unknown match topic');
  assert.ok(byTopic('homeassistant/sensor/double-take/unknown/config'), 'HA unknown discovery');
});

test('recognize: match name is slugified into the topic', () => {
  published = [];
  mqtt.recognize(
    baseOutput({
      counts: { person: 1, match: 1, miss: 0, unknown: 0 },
      matches: [
        { name: 'Jane Doe', confidence: 95, box: { top: 0, left: 0, width: 10, height: 10 } },
      ],
    })
  );
  // spaces become hyphens, other punctuation is stripped
  assert.ok(byTopic('double-take/matches/Jane-Doe'), 'slugified match topic');
});
