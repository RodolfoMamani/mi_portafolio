const routes = require('express').Router();
const controllerUsuario = require('../controllers/usuario.controller');


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Obtener una lista de usuarios
 *    tags: [Usuario]
 *    responses:
 *      200:
 *        description: Lista de usuarios exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuario'
 *                  
 *  
 */




routes.get('/usuarios', controllerUsuario.getUsuarios);

module.exports = routes;

