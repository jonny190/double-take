const express = require('express');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const { UI } = require('./constants')();

const app = express();
// Express 5 requires a valid path pattern; an empty UI.PATH mounts at root.
const mount = UI.PATH || '/';
// security headers. CSP is left off: the SPA relies on an inline bootstrap
// <script> (the ingress injection below) and PrimeVue's runtime-injected
// styles, which a default CSP would block - enabling it needs per-release
// tuning and is tracked separately. crossOriginResourcePolicy is relaxed to
// cross-origin so match/latest images can still be embedded by Home Assistant
// notifications on another origin.
app.use(
  helmet({
    contentSecurityPolicy: false,
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

app.use(mount, (req, res) => {
  const html = fs.readFileSync(
    `${process.cwd()}/frontend/${process.env.NODE_ENV === 'production' ? '' : 'dist/'}index.html`,
    'utf8'
  );
  // Safely serialize values to prevent XSS
  const ingressUrlSafe = JSON.stringify(req.headers['x-ingress-path'] || '');
  const publicPathSafe = JSON.stringify(UI?.PATH || '');
  res.send(
    html.replace(
      '</head>',
      `<script>
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
