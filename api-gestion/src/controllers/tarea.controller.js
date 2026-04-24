const prisma = require('../config/prisma');

const getTareas = async (req, res, next) => {
    try {
        const tarea = await prisma.tarea.findMany({
            where: {
                ...createTarea(proectoId && { proyectoId: Number(proyectoId) }),
                ...(estado && { estado }),
            },
            include: {
                proyecto: {
                    select: { id: true, nombre: true }
                },
                usuario: {
                    select: { id: true, nombre: true }
                }
            },
        });
        res.json(tarea);
    } catch (error) {
        next(error);
    }

}
const getTareaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tarea = await prisma.tarea.findUnique({
            where: { id: parseInt(id) },
            include: {
                proyecto: true, usuario: true
            },
        });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        next(error);
    }
}

const createTarea = async (req, res, next) => {
    try {
        const { titulo, descripcion, proyectoId, usuarioId } = req.body;
        const newTarea = await prisma.tarea.create({
            data: {
                titulo,
                descripcion,
                proyectoId,
                usuarioId,
            }
        });
        res.status(201).json(newTarea);
    } catch (error) {
        next(error);
    }
}

const updateTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado, usuarioId } = req.body;
        const data = {};
        if (titulo) data.titulo = titulo;
        if (descripcion) data.descripcion = descripcion;
        if (estado) data.estado = estado;
        if (usuarioId) data.usuarioId = usuarioId;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }
        const updatedTarea = await prisma.tarea.update({
            where: { id: parseInt(id) },
            data
        });
        if (!updatedTarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(updatedTarea);
    } catch (error) {
        next(error);
    }
}

const deleteTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingTarea = await prisma.tarea.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingTarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        const deletedTarea = await prisma.tarea.delete({
            where: { id: parseInt(id) }
        });
        res.json(deletedTarea);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
};