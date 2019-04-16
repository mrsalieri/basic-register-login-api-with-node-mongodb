const config = require('config');

module.exports = () => {
  if (!config.get('JWTToken.jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
};
