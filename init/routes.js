const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const swagger = require('../routes/swagger');
const errorMiddleware = require('../middlewares/error');
const notFoundMiddleware = require('../middlewares/notFound');
const languageMiddleware = require('../middlewares/language');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // request parsing
  app.use(languageMiddleware); // sets default language if not defined
  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/swagger', swagger); // interface and documentation
  app.use(errorMiddleware);
  app.use(notFoundMiddleware);
};
