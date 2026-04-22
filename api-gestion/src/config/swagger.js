const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestión de Proyectos',
      version: '1.0.0',
      description: 'API REST para gestionar usuarios, proyectos y tareas',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Rodolfo Mamani' },
            email: { type: 'string', example: 'rodo@example.com' },
            createAt: { type: 'string', format: 'date-time' }
          },
        },
        crearUsuario: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            nombre: { type: 'string', example: 'Rodolfo Mamani' },
            email: { type: 'string', example: 'rodo@example.com' },
            password: { type: 'string', example: 'Seguro123!' },
          },
        },
        actualizarUsuario: {
          type: 'object',
          properties: {
            nombre: { type: 'string', example: 'Rodolfo Mamani' },
            email: { type: 'string', example: 'rodo@example.com' },
            password: { type: 'string', example: 'Seguro123!' },
          },
        },

      }
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };