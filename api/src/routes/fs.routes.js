const express = require('express');
const { jwt, validate, Joi } = require('../middlewares');
const rateLimit = require('../middlewares/rate-limit');
const controller = require('../controllers/fs.controller');

const router = express.Router();

// throttle the filesystem endpoints to bound abuse of the routes that read
// from and mutate disk
router.use(rateLimit);

// disallow path separators and traversal sequences in filesystem params
const safeName = Joi.string()
  .pattern(/^[^/\\\0]+$/)
  .invalid('.', '..')
  .required();

router
  .get('/folders', jwt, controller.folders.list)
  .post('/folders/:name', jwt, validate({ params: { name: safeName } }), controller.folders.create)
  .delete(
    '/folders/:name',
    jwt,
    validate({ params: { name: safeName } }),
    controller.folders.delete
  );

module.exports = router;
