const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swagger = require('config').get('Swagger');

const router = express.Router();

const swaggerSpec = swaggerJSDoc(swagger);

// returns validated swagger spec in json format
router.get('/api-docs.json', (req, res) => {
  res.header('Content-Type', 'application/json').send(swaggerSpec);
});

// Activates swagger interface for browsers
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router;
