const userService = require('../services/user.service');

/**
 * @desc Crear un nuevo usuario
 * @route POST /api/users
 * @access Private
 */
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser
    });

  } catch (error) {
    console.error('Error en createUser:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Actualizar un usuario
 * @route PUT /api/users/:id
 * @access Private
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser(parseInt(id), userData);

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error en updateUser:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener todos los usuarios
 * @route GET /api/users
 * @access Private
 */
const getAllUsers = async (req, res) => {
 
  try {
    const txtSearch = req.headers.txtsearch || req.headers.txtSearch || '';
console.log('Buscar todos los usuarios con getAllUsers txtSearch:', txtSearch); 
    const users = await userService.getAllUsers(txtSearch);

    res.json({
      success: true,
      message: 'Usuarios obtenidos exitosamente',
      data: users,
      count: users.length
    });

  } catch (error) {
    console.error('Error en getAllUsers:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener un usuario por ID
 * @route GET /api/users/:id
 * @access Private
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));

    res.json({
      success: true,
      message: 'Usuario obtenido exitosamente',
      data: user
    });

  } catch (error) {
    console.error('Error en getUserById:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Eliminar un usuario
 * @route DELETE /api/users/:id
 * @access Private
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(parseInt(id));

    res.json({
      success: true,
      message: result.message,
      data: { id: result.id }
    });

  } catch (error) {
    console.error('Error en deleteUser:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser
};
