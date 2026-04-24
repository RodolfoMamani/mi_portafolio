const routes = require('express').Router();
const controllerTarea = require('../controllers/tarea.controller');


/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas (con filtros opcionales)
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: proyectoId
 *         schema:
 *           type: integer
 *         description: Filtrar tareas por proyecto
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, EN_PROGRESO, COMPLETADA]
 *         description: Filtrar tareas por estado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */

router.get('/tareas', controllerTarea.getTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtener tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       404:
 *         description: Tarea no encontrada
 */

router.get('/tareas/:id', controllerTarea.getTareaById);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: Error de validación
 */

router.post('/tareas', controllerTarea.createTarea);    


/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       404:
 *         description: Tarea no encontrada
 */


router.patch('/tareas/:id', controllerTarea.updateTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */


router.delete('/tareas/:id', controllerTarea.deleteTarea);


exports.routes = routes;