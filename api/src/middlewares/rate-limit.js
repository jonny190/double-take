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
