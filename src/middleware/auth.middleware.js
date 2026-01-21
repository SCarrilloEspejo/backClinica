const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Token no proporcionado' 
      });
    }

    // Extraer el token
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = verifyToken(token);
    
    // Manejar diferentes tipos de errores
    if (decoded && decoded.error) {
      if (decoded.error === 'expired') {
        return res.status(401).json({ 
          success: false,
          message: 'Sesión expirada. Por favor, inicia sesión nuevamente',
          error: 'SESSION_EXPIRED'
        });
      }
      return res.status(401).json({ 
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN'
      });
    }

    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: 'Token inválido'
      });
    }

    // Agregar información del usuario a la request
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error interno del servidor' 
    });
  }
};

module.exports = authMiddleware;
