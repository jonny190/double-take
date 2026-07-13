const crypto = require('crypto');
const axios = require('axios');

const md5 = (value) => crypto.createHash('md5').update(value).digest('hex');

// Parse a WWW-Authenticate: Digest challenge into its key/value directives.
const parseChallenge = (header) => {
  const params = {};
  header
    .replace(/^Digest\s+/i, '')
    .replace(/(\w+)=(?:"([^"]*)"|([^,]*))/g, (_match, key, quoted, unquoted) => {
      params[key] = quoted !== undefined ? quoted : (unquoted || '').trim();
      return '';
    });
  if (params.qop) {
    const options = params.qop.split(',').map((value) => value.trim());
    params.qop = options.includes('auth') ? 'auth' : options[0];
  }
  return params;
};

// Minimal RFC 2617 HTTP Digest auth over axios, replacing the unmaintained
// @mhoc/axios-digest-auth (which bundled a vulnerable axios). Keeps the same
// `new DigestAuth({ username, password }).request(opts)` interface.
class DigestAuth {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
    this.count = 0;
  }

  authorization(challenge, method, url) {
    const { realm, nonce, opaque, qop } = challenge;
    const algorithm = challenge.algorithm || 'MD5';
    const { pathname, search } = new URL(url);
    const uri = `${pathname}${search}`;
    const ha1 = md5(`${this.username}:${realm}:${this.password}`);
    const ha2 = md5(`${method.toUpperCase()}:${uri}`);

    this.count += 1;
    const nc = this.count.toString(16).padStart(8, '0');
    const cnonce = crypto.randomBytes(8).toString('hex');

    const response = qop
      ? md5(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
      : md5(`${ha1}:${nonce}:${ha2}`);

    let header =
      `Digest username="${this.username}", realm="${realm}", nonce="${nonce}", ` +
      `uri="${uri}", algorithm=${algorithm}, response="${response}"`;
    if (qop) header += `, qop=${qop}, nc=${nc}, cnonce="${cnonce}"`;
    if (opaque) header += `, opaque="${opaque}"`;
    return header;
  }

  async request(options) {
    try {
      return await axios(options);
    } catch (error) {
      const { response } = error;
      const challengeHeader = response?.headers?.['www-authenticate'];
      if (response?.status !== 401 || !/^Digest/i.test(challengeHeader || '')) throw error;

      const authorization = this.authorization(
        parseChallenge(challengeHeader),
        options.method || 'GET',
        options.url
      );
      return axios({
        ...options,
        headers: { ...(options.headers || {}), authorization },
      });
    }
  }
}

module.exports = DigestAuth;
module.exports.parseChallenge = parseChallenge;
module.exports.md5 = md5;
