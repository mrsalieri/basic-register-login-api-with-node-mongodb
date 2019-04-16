const jwt = require('jsonwebtoken');
const config = require('config');
const MessageHandler = require('../libs/messageHandler');

module.exports = (req, res, next) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) {
    return new MessageHandler(req, res)
    .unauthorized()
    .setMessageCode('no_access_token')
    .handle();
  }

  try {
    const decoded = jwt.verify(accessToken, config.get('JWTToken.jwtPrivateKey'));
    req.user = decoded;
    return next();
  } catch (ex) {
    return new MessageHandler(req, res)
      .badRequest()
      .setMessageCode('invalid_access_token')
      .handle();
  }
};
