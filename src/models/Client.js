const Query = require('../utils/query');

class Client {
  /**
   * Crear un nuevo cliente en la base de datos
   * @param {Object} clientData - Datos del cliente
   * @returns {Object} Cliente creado con su ID
   */
  static async create(clientData) {
    const { name, surname, secondSurname, phone, email, dni, obs } = clientData;
    
    const query = `
      INSERT INTO customers (name, surname, secondSurname, phone, email, dni, obs)
      OUTPUT INSERTED.id
      VALUES ('${name}', '${surname}', '${secondSurname || ''}', '${phone}', '${email}', '${dni}', '${obs || ''}')
    `;
    
    const result = await Query.myQueryWeb(query);
    const insertedId = result.recordset[0].id;
    
    return {
      id: insertedId,
      name,
      surname,
      secondSurname,
      phone,
      email,
      dni,
      obs
    };
  }

  /**
   * Actualizar un cliente existente
   * @param {number} id - ID del cliente
   * @param {Object} clientData - Datos a actualizar
   * @returns {Object} Cliente actualizado
   */
  static async update(id, clientData) {
    const { name, surname, secondSurname, phone, email, dni, obs } = clientData;
    
    const query = `
      UPDATE customers
      SET name = '${name}',
          surname = '${surname}',
          secondSurname = '${secondSurname || ''}',
          phone = '${phone}',
          email = '${email}',
          dni = '${dni}',
          obs = '${obs || ''}'
      WHERE id = ${id}
    `;
    
    await Query.myQueryWeb(query);
    
    return {
      id,
      name,
      surname,
      secondSurname,
      phone,
      email,
      dni,
      obs
    };
  }

  /**
   * Buscar cliente por ID
   * @param {number} id 
   * @returns {Object|null} Cliente encontrado o null
   */
  static async findById(id) {
    const query = `SELECT * FROM customers WHERE id = ${id}`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Buscar clientes por cualquier campo
   * @param {string} field - Nombre del campo (name, surname, secondSurname, phone, email, dni, obs)
   * @param {string} value - Valor a buscar
   * @returns {Array} Lista de clientes encontrados
   */
  static async findByField(field, value) {
    // Validar que el campo sea válido
    const validFields = ['name', 'surname', 'secondSurname', 'phone', 'email', 'dni', 'obs'];
    if (!validFields.includes(field)) {
      throw new Error(`Campo inválido: ${field}`);
    }
    
    // Usar LIKE para búsquedas más flexibles (busca coincidencias parciales)
    const query = `SELECT * FROM customers WHERE ${field} LIKE '%${value}%'`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset || [];
  }

  /**
   * Buscar cliente por email (búsqueda exacta)
   * @param {string} email 
   * @returns {Object|null} Cliente encontrado o null
   */
  static async findByEmail(email) {
    const query = `SELECT * FROM customers WHERE LTRIM(RTRIM(email)) = '${email.trim()}'`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Buscar cliente por DNI (búsqueda exacta)
   * @param {string} dni 
   * @returns {Object|null} Cliente encontrado o null
   */
  static async findByDni(dni) {
    const query = `SELECT * FROM customers WHERE LTRIM(RTRIM(dni)) = '${dni.trim()}'`;
    const result = await Query.myQueryWeb(query);
    
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Obtener todos los clientes o filtrados por búsqueda global
   * @param {string} searchText - Texto opcional para buscar en todos los campos
   * @returns {Array} Lista de clientes
   */
  static async findAll(searchText = null) {
    console.log('Buscar todos los clientes con searchText:', searchText);
    let query;
    
    if (searchText && searchText.trim() !== '') {
      // Búsqueda en todos los campos
      const search = searchText.trim();
      query = `
        SELECT * FROM customers 
        WHERE name LIKE '%${search}%'
           OR surname LIKE '%${search}%'
           OR secondSurname LIKE '%${search}%'
           OR phone LIKE '%${search}%'
           OR email LIKE '%${search}%'
           OR dni LIKE '%${search}%'
           OR obs LIKE '%${search}%'
        ORDER BY id DESC
      `;
      console.log('Query de búsqueda: IF', query);
    } else {
      // Sin filtro, traer todos
      query = `SELECT * FROM customers ORDER BY id DESC`;
      console.log('Query de búsqueda else:', query);
    }
    
    const result = await Query.myQueryWeb(query);
    console.log('Clientes encontrados:', result.recordset);
    return result.recordset || [];
  }

  /**
   * Eliminar un cliente por ID
   * @param {number} id - ID del cliente a eliminar
   * @returns {boolean} True si se eliminó correctamente
   */
  static async delete(id) {
    const query = `DELETE FROM customers WHERE id = ${id}`;
    await Query.myQueryWeb(query);
    return true;
  }
}

module.exports = Client;
