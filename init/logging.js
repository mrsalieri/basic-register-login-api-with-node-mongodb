const winston = require('winston');
const config = require('config');
const morgan = require('morgan');
require('winston-mongodb');
require('express-async-errors');

module.exports = (app) => { // catches unhandled rejections and throws exception
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.configure({
    transports:
    [
      new winston.transports.File({ // create logs on file
        filename: config.get('Log.logFile'),
        level: 'error',
      }),
      new winston.transports.MongoDB({ // create logs on MongoDB
        db: config.get('DB.url'),
        level: 'info',
      }),
    ],
    exceptionHandlers:
    [ // create exception logs on file
      new winston.transports.File({ filename: config.get('Log.uncExcFile') }),
    ],
    exitOnError: true,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ',
      }),
      winston.format.json(),
    ),
    defaultMeta: { service: config.get('General.serviceName') },
  });

  winston.stream = { // Stream for morgan to log http requests
    write: (message) => {
      winston.info(message);
    },
  };
  app.use(morgan('dev', { stream: winston.stream }));

  if (!['production', 'test'].includes(app.get('env'))) { // create logs on the console
    winston.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
};
