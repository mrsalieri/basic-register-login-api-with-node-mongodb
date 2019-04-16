const winston = require('winston');
const MessageHandler = require('../libs/messageHandler');

module.exports = (req, res, next) => {
  winston.info(`Url not found ${req.path}`);
  return new MessageHandler(req, res)
    .notFound()
    .setMessageCode('url_not_found')
    .handle();
};
