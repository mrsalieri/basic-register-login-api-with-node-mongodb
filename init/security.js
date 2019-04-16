const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
  app.use(rateLimit({ // Limits the number of requests
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  app.use(helmet()); // Protects the platform from known attack types

  app.use(cors({ // Solves the cross-origin issues
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
  }));
};
