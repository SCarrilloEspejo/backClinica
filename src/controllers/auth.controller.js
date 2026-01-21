const authService = require('../services/auth.service');

/**
 * @desc Login de usuario
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: result
    });

  } catch (error) {
    console.error('Error en login:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Registro de nuevo usuario
 * @route POST /api/auth/register
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.register(username, email, password);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: result
    });

  } catch (error) {
    console.error('Error en registro:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Verificar token de autenticación
 * @route GET /api/auth/verify
 * @access Private
 */
const verifyAuth = async (req, res) => {
  try {
    const result = await authService.verifyUserAuth(req.user.id);

    res.json({
      success: true,
      message: 'Token válido',
      data: {
        user: result
      }
    });

  } catch (error) {
    console.error('Error en verificación:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

module.exports = {
  login,
  register,
  verifyAuth
};
