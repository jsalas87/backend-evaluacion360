const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Evaluación 360',
    version: '1.0.0',
    description: 'Evaluación Para Empleados Remotos',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de desarrollo',
    },
  ],
};

// Opciones para el swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

// Generar especificaciones de Swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
