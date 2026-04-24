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
        Proyecto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Proyecto Alpha' },
            descripcion: { type: 'string', example: 'Descripción del proyecto' },
            usuarioId: { type: 'integer', example: 1 },
            createAt: { type: 'string', format: 'date-time' },
          },
        },
        CrearProyecto: {
          type: 'object',
          required: ['nombre', 'usuarioId'],
          properties: {
            nombre: { type: 'string', example: 'Proyecto Alpha' },
            descripcion: { type: 'string', example: 'Descripción del proyecto' },
            usuarioId: { type: 'integer', example: 1 },
          }
        },
        ActualizarProyecto: {
          type: 'object',
          properties: {
            nombre: { type: 'string', example: 'Proyecto Alpha' },
            descripcion: { type: 'string', example: 'Descripción del proyecto' },
            usuarioId: { type: 'integer', example: 1 },
          }
        },
        Tarea: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Tarea 1' },
            descripcion: { type: 'string', example: 'Descripción de la tarea' },
            estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'], example: 'PENDIENTE' },
            proyectoId: { type: 'integer', example: 1 },
            usuarioId: { type: 'integer', example: 1 },
            createAt: { type: 'string', format: 'date-time' },
          },
        },
        CrearTarea: {
          type: 'object',
          required: ['titulo', 'proyectoId'],
          properties: {
            titulo: { type: 'string', example: 'Diseño de la interfaz' },
            descripcion: { type: 'string', example: 'Crear los diseños para la nueva funcionalidad' },
            proyectoId: { type: 'integer', example: 1 },
            usuarioId: { type: 'integer', example: 1 , nullable: true },
          }
        },
        ActualizarTarea: {
          type: 'object',
          properties: {
            titulo: { type: 'string', example: 'Diseño de la interfaz' },
            descripcion: { type: 'string', example: 'Crear los diseños para la nueva funcionalidad' },
            proyectoId: { type: 'integer', example: 1 },
            usuarioId: { type: 'integer', example: 1 , nullable: true },
          }
        }

      }
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };