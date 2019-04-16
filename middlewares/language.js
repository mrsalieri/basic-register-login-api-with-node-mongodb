const _ = require('lodash');
const Joi = require('joi');
const config = require('config');

module.exports = (req, res, next) => {
  const { error } = Joi.validate(_.pick(req.body, ['lang']), { lang: Joi.string().min(2).required() });
  if (error) req.body.lang = config.get('Language.defaultLang');

  next();
};
