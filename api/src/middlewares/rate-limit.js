const rateLimit = require('express-rate-limit');

// Rate limiter for the UI-facing filesystem and image endpoints. Sized well
// above normal usage: a match/train page loads a full page of thumbnails at
// once (pagination is 50/page), so the limit is set high enough that browsing
// and paging are never throttled while still bounding abuse of the routes that
// read from disk. The trustProxy validation is disabled because Double Take is
// commonly deployed behind a reverse proxy / ingress where client IPs are not
// distinguishable; the generous limit is intentionally proxy-agnostic.
module.exports = rateLimit({
  windowMs: 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  validate: { trustProxy: false },
});

// Tight limiter for the unauthenticated login endpoint to bound password
// brute-forcing. Generous enough for a human fat-fingering their password,
// tight enough that automated guessing is impractical. Same proxy-agnostic
// stance as above.
module.exports.login = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  validate: { trustProxy: false },
});
