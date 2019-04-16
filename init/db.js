const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  const db = config.get('DB.url');
  mongoose.connect(db, { // settings to disable deprecation warnings, may be removed in the future
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    winston.info(`Connected to ${db}...`);
  })
  .catch((err) => {
    winston.error(err.message, err);
  });
};
