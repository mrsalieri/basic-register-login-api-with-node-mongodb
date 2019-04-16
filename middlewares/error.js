const winston = require('winston');
const Translate = require('../libs/translate');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send(Translate.getTranslation(req.body.lang || '', 'unexpected_error'));
};
