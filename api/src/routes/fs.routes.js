const express = require('express');
const { jwt, validate, Joi } = require('../middlewares');
const controller = require('../controllers/fs.controller');

const router = express.Router();

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
