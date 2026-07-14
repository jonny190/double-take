const express = require('express');
const { jwt, validate, Joi } = require('../middlewares');
const rateLimit = require('../middlewares/rate-limit');
const controller = require('../controllers/storage.controller');

const router = express.Router();

// throttle the image/storage endpoints to bound abuse of the routes that read
// files from disk (sized above the per-page thumbnail burst so browsing is
// never affected)
router.use(rateLimit);

// disallow path separators and traversal sequences in filesystem params
const safeName = Joi.string()
  .pattern(/^[^/\\\0]+$/)
  .invalid('.', '..')
  .required();

router
  .get(
    '/matches/:filename',
    jwt,
    validate({
      params: { filename: safeName },
      query: { box: Joi.string().valid('true', 'false').default(false) },
    }),
    controller.matches
  )
  .delete(
    '/train',
    jwt,
    validate({ body: { files: Joi.array().items(Joi.object()).required() } }),
    controller.delete
  )
  .get(
    '/train/:name/:filename',
    jwt,
    validate({ params: { name: safeName, filename: safeName } }),
    controller.train
  )
  .get('/latest/:filename', jwt, validate({ params: { filename: safeName } }), controller.latest);

module.exports = router;
