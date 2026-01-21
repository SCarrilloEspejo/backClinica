const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const Query = require('../utils/query');
const bcrypt = require('bcryptjs');

class AuthService {
  async login(username, password) {
    // Validar datos de entrada
    if (!username || !password) {
      throw {
        status: 400,
        message: 'Usuario y contraseña son requeridos'
      };
    }

    try {
      // Usar parámetros preparados para prevenir SQL Injection
      const result = await Query.myQueryWeb(
        "SELECT * FROM USERS WHERE EMAIL = '" + username + "' AND PASSWORD = '" + password + "'",
      );
      
      console.log('Result->', result.recordset[0]);
      
      // Verificar si se encontró el usuario
      const userData = result.recordset[0];
      
      if (!userData) {
        throw {
          status: 401,
          message: 'Credenciales inválidas'
        };
      }

      // Comparar contraseña hasheada
      /* const isPasswordValid = await bcrypt.compare(password, userData.PASSWORD);
      
      if (!isPasswordValid) {
        throw {
          status: 401,
          message: 'Credenciales inválidas'
        };
      } */

      // Generar token JWT
      const token = generateToken(userData.id);

      return {
        token,
        user: {
          id: userData.id,
          username: userData.name.toString().trim(),
          email: userData.email.toString().trim(),
          admin: userData.admin,
          color: userData.color.toString().trim()
        }
      };
      
    } catch (error) {
      // Si el error ya tiene status, lanzarlo tal cual
      if (error.status) {
        throw error;
      }
      
      // Error de base de datos u otro
      console.error('Error en login:', error);
      throw {
        status: 500,
        message: 'Error al procesar el login: ' + error.message
      };
    }
  }

  async register(username, email, password) {
    // Validar datos
    if (!username || !email || !password) {
      throw {
        status: 400,
        message: 'Todos los campos son requeridos'
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

    // Verificar si el usuario ya existe
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw {
        status: 409,
        message: 'El usuario ya existe'
      };
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      throw {
        status: 409,
        message: 'El email ya está registrado'
      };
    }

    // Crear nuevo usuario
    const newUser = await User.create({ username, email, password });

    // Generar token JWT
    const token = generateToken(newUser.id);

    return {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        color: newUser.color,
        admin: newUser.admin
      }
    };
  }

  async verifyUserAuth(userId) {
    return {
      id: userId
    };
  }
}

module.exports = new AuthService();
