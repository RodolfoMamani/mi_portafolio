const prisma = require('../config/prisma');

const getUsuarios = async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findMany({
      select: {id: true, nombre: true, email: true, creadoEn: true}
    });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsuarios }
