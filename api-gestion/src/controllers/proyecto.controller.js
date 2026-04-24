const prisma = require('../config/prisma');

const getProyectos = async (req, res, next) => {
    try {
        const proyecto = await prisma.proyecto.findMany({
            include: { usuario: { select: { nombre: true } } }
        });
        res.json(proyecto);
    } catch (error) {
        next(error);
    }
}

const getProyectoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const proyecto = await prisma.proyecto.findUnique({
            where: { id: parseInt(id) },
            include: { tareas: true, usuario: { select: { nombre: true, email: true } } }
        });
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json(proyecto);
    } catch (error) {
        next(error);
    }
}

const createProyecto = async (req, res, next) => {
    try {
        const { nombre, descripcion, usuarioId } = req.body;
        const existingUsuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });
        if (!existingUsuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const newProyecto = await prisma.proyecto.create({
            data: {
                nombre,
                descripcion,
                usuarioId,
            }
        });
        res.status(201).json(newProyecto);
    } catch (error) {
        next(error);
    }
}

const updateProyecto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, usuarioId } = req.body;
        const existingProyecto = await prisma.proyecto.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingProyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        const data = {};
        if (nombre) data.nombre = nombre;
        if (descripcion) data.descripcion = descripcion;
        if (usuarioId) {
            const existingUsuario = await prisma.usuario.findUnique({
                where: { id: usuarioId }
            });
            if (!existingUsuario) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
            data.usuarioId = usuarioId;
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }
        const updatedProyecto = await prisma.proyecto.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(updatedProyecto);
    } catch (error) {
        next(error);
    }
};

const deleteProyecto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingProyecto = await prisma.proyecto.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingProyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        const deletedProyecto = await prisma.proyecto.delete({
            where: { id: parseInt(id) }
        });
        res.json(deletedProyecto);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto
};