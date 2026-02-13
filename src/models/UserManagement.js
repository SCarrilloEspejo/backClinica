const Query = require('../utils/query');
const bcrypt = require('bcryptjs');

class UserManagement {
  /**
   * Crear un nuevo usuario en la base de datos
   * @param {Object} userData - Datos del usuario
   * @returns {Object} Usuario creado con su ID
   */
  static async create(userData) {
    const { name, surname, secondSurname, phone, movil, email, color, admin, password } = userData;
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (name, surname, secondSurname, phone, movil, email, color, admin, password)
      OUTPUT INSERTED.id
      VALUES ('${name}', '${surname}', '${secondSurname || ''}', '${phone}', '${movil}', '${email}', '${color}', ${admin ? 1 : 0}, '${hashedPassword}')
    `;
    
    const result = await Query.myQueryWeb(query);
    const insertedId = result.recordset[0].id;
    
    return {
      id: insertedId,
      name,
      surname,
      secondSurname,
      phone,
      movil,
      email,
      color,
      admin
    };
  }

  /**
   * Actualizar un usuario existente
   * @param {number} id - ID del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Object} Usuario actualizado
   */
  static async update(id, userData) {
    const { name, surname, secondSurname, phone, movil, email, color, admin, password } = userData;
    
    let query;
    
    // Si se proporciona contraseña, actualizarla también
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `
        UPDATE users
        SET name = '${name}',
            surname = '${surname}',
            secondSurname = '${secondSurname || ''}',
            phone = '${phone}',
            movil = '${movil}',
            email = '${email}',
            color = '${color}',
            admin = ${admin ? 1 : 0},
            password = '${hashedPassword}'
        WHERE id = ${id}
      `;
    } else {
      // Actualizar sin cambiar la contraseña
      query = `
        UPDATE users
        SET name = '${name}',
            surname = '${surname}',
            secondSurname = '${secondSurname || ''}',
            phone = '${phone}',
            movil = '${movil}',
            email = '${email}',
            color = '${color}',
            admin = ${admin ? 1 : 0}
        WHERE id = ${id}
      `;
    }
    
    await Query.myQueryWeb(query);
    
    return {
      id,
      name,
      surname,
      secondSurname,
      phone,
      movil,
      email,
      color,
      admin
    };
  }

  /**
   * Buscar usuario por ID
   * @param {number} id 
   * @returns {Object|null} Usuario encontrado o null
   */
  static async findById(id) {
    const query = `SELECT id, name, surname, secondSurname, phone, movil, email, color, admin, password FROM users WHERE id = ${id}`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Buscar usuario por email (búsqueda exacta)
   * @param {string} email 
   * @returns {Object|null} Usuario encontrado o null
   */
  static async findByEmail(email) {
    const query = `SELECT id, name, surname, secondSurname, phone, movil, email, color, admin FROM users WHERE LTRIM(RTRIM(email)) = '${email.trim()}'`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Obtener todos los usuarios
   * @returns {Array} Lista de usuarios
   */
  static async findAll(txtSearch) {
    const query = "SELECT id, name, surname, secondSurname, phone, movil, email, color, admin "
    query = query + "where name like '%" + txtSearch + "%' or surname like '%" + txtSearch + "%' or secondSurname like '%" + txtSearch + "%' or phone like '%" + txtSearch + "%' or movil like '%" + txtSearch + "%' or email like '%" + txtSearch + "%'  ";
    query = query + "FROM users ORDER BY id DESC";
conse.info(query)
    const result = await Query.myQueryWeb(query);

    return result.recordset || [];
  }

  /**
   * Eliminar un usuario por ID
   * @param {number} id - ID del usuario a eliminar
   * @returns {boolean} True si se eliminó correctamente
   */
  static async delete(id) {
    const query = `DELETE FROM users WHERE id = ${id}`;
    await Query.myQueryWeb(query);
    return true;
  }
}

module.exports = UserManagement;
