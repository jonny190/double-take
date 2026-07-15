const _ = require('lodash');

const KEYS = [
  // generic
  /passw(or)?d/i,
  /key/,
  /^pw$/,
  /^pass$/i,
  /secret/i,
  /token/i,
  /api[-._]?key/i,
  /session[-._]?id/i,
  // specific
  /^connect\.sid$/, // https://github.com/expressjs/session
];

const key = (str) => KEYS.some((regex) => regex.test(str));

// sensitive query-string parameters to scrub from any URL that appears in a value
const URL_PARAMS = /([?&](?:api[-._]?key|key|token|password|secret|access[-._]?token)=)[^&#\s]+/gi;
// userinfo credentials in a URL: scheme://user:pass@host -> scheme://user:****@host
const URL_USERINFO = /(\b[a-z][a-z0-9+.-]*:\/\/[^\s/@:]+:)[^\s/@]+(@)/gi;

// scrub credentials that live inside a string VALUE (not just under a sensitive
// key), e.g. a detector/frigate URL carrying `?api_key=` or `user:pass@host`
const scrubString = (str, value = '********') => {
  if (typeof str !== 'string') return str;
  return str.replace(URL_USERINFO, `$1${value}$2`).replace(URL_PARAMS, `$1${value}`);
};

const traverse = (obj, value) => {
  if (typeof obj === 'string') return scrubString(obj, value);
  if (!_.isObject(obj)) return obj;
  const o = JSON.parse(JSON.stringify(obj));
  Object.keys(o).forEach((k) => {
    if (o[k] !== null && typeof o[k] === 'object') o[k] = traverse(o[k], value);
    else if (typeof o[k] === 'string') o[k] = key(k) ? value : scrubString(o[k], value);
  });
  return o;
};

module.exports = (obj, value = '********') => traverse(obj, value);
module.exports.string = scrubString;
