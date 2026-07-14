const express = require('express');
const multer = require('multer');
const { jwt, validate, Joi } = require('../middlewares');
const controller = require('../controllers/train.controller');

const router = express.Router();

// disallow path separators and traversal sequences in filesystem params
const safeName = Joi.string()
  .pattern(/^[^/\\\0]+$/)
  .invalid('.', '..')
  .required();

router
  .get(
    '/',
    jwt,
    validate({ query: { page: Joi.number().integer().default(1).min(1) } }),
    controller.get
  )
  .patch('/:id', jwt, validate({ body: { name: safeName } }), controller.patch)
  .get('/status', jwt, controller.status)
  .post(
    '/add/:name',
    jwt,
    validate({ params: { name: safeName } }),
    multer().array('files[]'),
    controller.add
  )
  .delete('/remove/:name', jwt, validate({ params: { name: safeName } }), controller.delete)
  .get('/retrain/:name', jwt, validate({ params: { name: safeName } }), controller.retrain);

module.exports = router;
