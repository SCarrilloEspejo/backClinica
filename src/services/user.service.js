const UserManagement = require('../models/UserManagement');

class UserService {
  /**
   * Crear un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Object} Usuario creado
   */
  async createUser(userData) {
    const { name, surname, secondSurname, phone, movil, email, color, admin, password } = userData;

    // Validar campos requeridos
    if (!name || !surname || !email || !password) {
      throw {
        status: 400,
        message: 'Los campos name, surname, email y password son requeridos'
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw {
        status: 400,
        message: 'Formato de email inválido'
      };
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      throw {
        status: 400,
        message: 'La contraseña debe tener al menos 6 caracteres'
      };
    }

    try {
      // Verificar si el email ya existe
      const existingEmail = await UserManagement.findByEmail(email);
      if (existingEmail) {
        throw {
          status: 409,
          message: 'El email ya está registrado'
        };
      }

      // Crear el usuario
      const newUser = await UserManagement.create({
        name: name.trim(),
        surname: surname.trim(),
        secondSurname: secondSurname ? secondSurname.trim() : '',
        phone: phone ? phone.trim() : '',
        movil: movil ? movil.trim() : '',
        email: email.trim().toLowerCase(),
        color: color ? color.trim() : '#000000',
        admin: admin === true || admin === 'true',
        password
      });

      return newUser;

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al crear usuario:', error);
      throw {
        status: 500,
        message: 'Error al crear el usuario: ' + error.message
      };
    }
  }

  /**
   * Actualizar un usuario existente
   * @param {number} id - ID del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Object} Usuario actualizado
   */
  async updateUser(id, userData) {
    const { name, surname, secondSurname, phone, movil, email, color, admin, password } = userData;

    // Validar campos requeridos
    if (!name || !surname || !email) {
      throw {
        status: 400,
        message: 'Los campos name, surname y email son requeridos'
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw {
        status: 400,
        message: 'Formato de email inválido'
      };
    }

    // Si se proporciona contraseña, validar longitud
    if (password && password.trim() !== '' && password.length < 6) {
      throw {
        status: 400,
        message: 'La contraseña debe tener al menos 6 caracteres'
      };
    }

    try {
      // Verificar que el usuario existe
      const existingUser = await UserManagement.findById(id);
      if (!existingUser) {
        throw {
          status: 404,
          message: 'Usuario no encontrado'
        };
      }

      // Verificar si el email ya existe en otro usuario
      const existingEmail = await UserManagement.findByEmail(email);
      if (existingEmail && existingEmail.id !== id) {
        throw {
          status: 409,
          message: 'El email ya está registrado en otro usuario'
        };
      }

      // Actualizar el usuario
      const updatedUser = await UserManagement.update(id, {
        name: name.trim(),
        surname: surname.trim(),
        secondSurname: secondSurname ? secondSurname.trim() : '',
        phone: phone ? phone.trim() : '',
        movil: movil ? movil.trim() : '',
        email: email.trim().toLowerCase(),
        color: color ? color.trim() : '#000000',
        admin: admin === true || admin === 'true',
        password: password || ''
      });

      return updatedUser;

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al actualizar usuario:', error);
      throw {
        status: 500,
        message: 'Error al actualizar el usuario: ' + error.message
      };
    }
  }

  /**
   * Obtener todos los usuarios
   * @returns {Array} Lista de usuarios
   */
  async getAllUsers(txtSearch) {
    try {
      const users = await UserManagement.findAll(txtSearch);
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw {
        status: 500,
        message: 'Error al obtener los usuarios: ' + error.message
      };
    }
  }

  /**
   * Obtener un usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Object} Usuario encontrado
   */
  async getUserById(id) {
    try {
      const user = await UserManagement.findById(id);
      
      if (!user) {
        throw {
          status: 404,
          message: 'Usuario no encontrado'
        };
      }

      return user;
    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al obtener usuario:', error);
      throw {
        status: 500,
        message: 'Error al obtener el usuario: ' + error.message
      };
    }
  }

  /**
   * Eliminar un usuario
   * @param {number} id - ID del usuario a eliminar
   * @returns {Object} Confirmación de eliminación
   */
  async deleteUser(id) {
    try {
      // Verificar que el usuario existe
      const existingUser = await UserManagement.findById(id);
      if (!existingUser) {
        throw {
          status: 404,
          message: 'Usuario no encontrado'
        };
      }

      // Eliminar el usuario
      await UserManagement.delete(id);

      return {
        id,
        message: 'Usuario eliminado exitosamente'
      };

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al eliminar usuario:', error);
      throw {
        status: 500,
        message: 'Error al eliminar el usuario: ' + error.message
      };
    }
  }
}

module.exports = new UserService();
