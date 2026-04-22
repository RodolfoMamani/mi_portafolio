const routes = require('express').Router();
const controllerUsuario = require('../controllers/usuario.controller');

routes.get('/usuarios', controllerUsuario.getUsuarios);

module.exports = routes;