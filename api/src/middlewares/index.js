const Joi = require('joi');
const { auth, jwt } = require('../util/auth.util');
const { UNAUTHORIZED } = require('../constants/http-status');
const { AUTH } = require('../constants')();

module.exports.jwt = async (req, res, next) => {
  try {
    if (AUTH === false) {
      return next();
    }
    const token = req.query.token || req.headers.authorization;
    const tokens = ((req.query.token && auth.get().tokens) || []).map((obj) => obj.token);
    if (tokens.includes(token)) return next();
    const { route } = jwt.decode(token);

    if (route && !req.baseUrl.includes(route)) throw Error('Unauthorized');
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).error('Unauthorized');
  }
};

module.exports.setup = async (req, res, next) => {
  try {
    const { password } = auth.get();
    if (password) throw Error('password is already set');
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).error(error.message);
  }
};

module.exports.validate = (schemas) => (req, res, next) => {
  const errors = [];
  for (const [key, joiSchema] of Object.entries(schemas)) {
    const { allowUnknown, ...schema } = joiSchema;
    const isArray = Array.isArray(req[key]);
    const { error, value } = isArray
      ? joiSchema.schema.validate([...req[key]], {
          allowUnknown,
          abortEarly: false,
        })
      : Joi.object(schema).validate(
          { ...req[key] },
          {
            allowUnknown:
              key === 'query' && allowUnknown === undefined ? true : allowUnknown !== undefined,
            abortEarly: false,
          }
        );
    if (error?.details) {
      errors.push(
        ...error.details.map((obj) => ({
          location: key,
          key: obj.context.label,
          error: obj.message,
        }))
      );
    }

    // Update the request to use the validated values (which may be
    // transformed/defaulted by Joi). Express 5 exposes `req.query` as an
    // accessor with no setter (it's re-parsed from `req.url` on every read),
    // so a plain `req[key] = value` assignment silently no-ops for `key ===
    // 'query'` instead of throwing - callers that rely on a Joi `.default()`
    // for an omitted query param (e.g. GET /api/recognize without
    // `&attempts=`) then see `undefined` downstream rather than the
    // documented default. Defining an own data property shadows the
    // prototype's accessor and works for every `key`, including the plain
    // writable properties (`body`, `params`) that a straight assignment
    // already handled correctly.
    Object.defineProperty(req, key, {
      value,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }

  if (errors.length) return res.status(422).send({ errors });

  next();
};

module.exports.Joi = Joi;
