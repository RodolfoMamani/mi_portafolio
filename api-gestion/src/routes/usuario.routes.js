const routes = require('express').Router();
const controllerUsuario = require('../controllers/usuario.controller');


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Obtener una lista de usuarios
 *    tags: [Usuarios]
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


/**
 * @swagger
 * /api/usuarios/ {id}:
 *  get:
 *    summary: Obtener usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del usuario
 *    responses:
 *      200:
 *        description: Usuario obtenido exitosamente
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *  
 */

routes.get('/usuarios/:id', controllerUsuario.getUsuarioById);


/**
 * @swagger
 * /api/usuario:
 *  post:
 *    summary: Crear un nuevo usuario
 *    tags: [Usuarios]
 *    requestBody:
 *        required: true
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/crearUsuario'
 *    responses:
 *      201:
 *        description: Usuario creado exitosamente
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *  
 */


routes.post('/usuarios', controllerUsuario.createUsuario);

/**
 * @swagger
 * /api/usuario/ {id}:
 *  patch:
 *    summary: Actuyalizar un usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del usuario
 *    requestBody:
 *        required: true
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/actualizarUsuario'
 *    responses:
 *      201:
 *        description: Usuario actualizado exitosamente
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *  
 */

routes.patch('/usuarios/:id', controllerUsuario.updateUsuario);



/**
 * @swagger
 * /api/usuario/ {id}:
 *  delete:
 *    summary: Eliminar un usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del usuario
 *    responses:
 *      204:
 *        description: Usuario eliminado exitosamente
 *      404:
 *        description: Usuario eliminado exitosamente
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *  
 */

routes.delete('/usuarios/:id', controllerUsuario.deleteUsuario);




module.exports = routes;

