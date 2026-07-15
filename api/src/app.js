const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const { UI } = require('./constants')();

const app = express();
// Express 5 requires a valid path pattern; an empty UI.PATH mounts at root.
const mount = UI.PATH || '/';

// give each response a per-request nonce for the one inline bootstrap <script>
// the SPA fallback injects, so the CSP below can allow that script without
// resorting to 'unsafe-inline' for scripts
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
});

// security headers. The CSP is deliberately permissive in two places the app
// genuinely needs: style-src 'unsafe-inline' (PrimeVue injects runtime styles)
// and worker-src blob: (the ace editor's yaml worker). Scripts are locked to
// same-origin plus the per-request nonce. crossOriginResourcePolicy is relaxed
// so Home Assistant can embed match/latest images from another origin.
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        // data: is required because the ace editor loads its themes as
        // data:text/javascript scripts; the nonce still covers our own inline
        // bootstrap script
        'script-src': ["'self'", 'data:', (req, res) => `'nonce-${res.locals.cspNonce}'`],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'blob:'],
        'worker-src': ["'self'", 'blob:'],
        'connect-src': ["'self'"],
        'frame-ancestors': ["'self'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        // the app is commonly served over http behind a reverse proxy
        'upgrade-insecure-requests': null,
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
  })
);
// the UI is served same-origin by this API; cross-origin browser access is
// only needed by the vite dev server, so production sends no CORS headers
if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(require('./middlewares/respond'));

app.use(
  mount,
  express.static(`./frontend/${process.env.NODE_ENV === 'production' ? '' : 'dist/'}`, {
    index: false,
  })
);
app.use(`${UI.PATH}/api`, require('./routes'));

// JSON.stringify alone yields a valid JS string but is NOT safe to embed in an
// inline <script>: a value like `</script>...` would terminate the block.
// Escape the characters that can break out of the script/HTML context, plus the
// JS line separators U+2028/U+2029 (legal in JSON, illegal in a JS string).
const LINE_SEPARATORS = new RegExp(`[${String.fromCharCode(0x2028, 0x2029)}]`, 'g');
const embedInScript = (value) =>
  JSON.stringify(value ?? '')
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEPARATORS, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

app.use(mount, (req, res) => {
  const html = fs.readFileSync(
    `${process.cwd()}/frontend/${process.env.NODE_ENV === 'production' ? '' : 'dist/'}index.html`,
    'utf8'
  );
  const ingressUrlSafe = embedInScript(req.headers['x-ingress-path']);
  const publicPathSafe = embedInScript(UI?.PATH);
  res.send(
    html.replace(
      '</head>',
      `<script nonce="${res.locals.cspNonce}">
        window.ingressUrl = ${ingressUrlSafe};
        window.publicPath = ${publicPathSafe};
      </script>
      </head>`
    )
  );
});

// errors from middleware that run before respond.js (e.g. a JSON parse
// failure) arrive here with the native res.send, so sending the error object
// would serialize its enumerable internals, including the request body
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (res.headersSent) return;
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).send({ error: err instanceof Error ? err.message : 'internal server error' });
});

module.exports = app;
