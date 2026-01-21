const Client = require('../models/Client');

class ClientService {
  /**
   * Crear un nuevo cliente
   * @param {Object} clientData - Datos del cliente
   * @returns {Object} Cliente creado
   */
  async createClient(clientData) {
    const { name, surname, secondSurname, phone, email, dni, obs } = clientData;

    // Validar campos requeridos
    if (!name || !surname || !phone || !email || !dni) {
      throw {
        status: 400,
        message: 'Los campos name, surname, phone, email y dni son requeridos'
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

    // Validar longitud de teléfono (10 caracteres según BD)
    if (phone.trim().length > 10) {
      throw {
        status: 400,
        message: 'El teléfono no puede tener más de 10 caracteres'
      };
    }

    try {
      // Verificar si el email ya existe
      const existingEmail = await Client.findByEmail(email);
      if (existingEmail) {
        throw {
          status: 409,
          message: 'El email ya está registrado'
        };
      }

      // Verificar si el DNI ya existe
      const existingDni = await Client.findByDni(dni);
      if (existingDni) {
        throw {
          status: 409,
          message: 'El DNI ya está registrado'
        };
      }

      // Crear el cliente
      const newClient = await Client.create({
        name: name.trim(),
        surname: surname.trim(),
        secondSurname: secondSurname ? secondSurname.trim() : '',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        dni: dni.trim().toUpperCase(),
        obs: obs ? obs.trim() : ''
      });

      return newClient;

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al crear cliente:', error);
      throw {
        status: 500,
        message: 'Error al crear el cliente: ' + error.message
      };
    }
  }

  /**
   * Actualizar un cliente existente
   * @param {number} id - ID del cliente
   * @param {Object} clientData - Datos a actualizar
   * @returns {Object} Cliente actualizado
   */
  async updateClient(id, clientData) {
    const { name, surname, secondSurname, phone, email, dni, obs } = clientData;

    // Validar campos requeridos
    if (!name || !surname || !phone || !email || !dni) {
      throw {
        status: 400,
        message: 'Los campos name, surname, phone, email y dni son requeridos'
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

    // Validar longitud de teléfono
    if (phone.trim().length > 10) {
      throw {
        status: 400,
        message: 'El teléfono no puede tener más de 10 caracteres'
      };
    }

    try {
      // Verificar que el cliente existe
      const existingClient = await Client.findById(id);
      if (!existingClient) {
        throw {
          status: 404,
          message: 'Cliente no encontrado'
        };
      }

      // Verificar si el email ya existe en otro cliente
      const existingEmail = await Client.findByEmail(email);
      if (existingEmail && existingEmail.id !== id) {
        throw {
          status: 409,
          message: 'El email ya está registrado en otro cliente'
        };
      }

      // Verificar si el DNI ya existe en otro cliente
      const existingDni = await Client.findByDni(dni);
      if (existingDni && existingDni.id !== id) {
        throw {
          status: 409,
          message: 'El DNI ya está registrado en otro cliente'
        };
      }

      // Actualizar el cliente
      const updatedClient = await Client.update(id, {
        name: name.trim(),
        surname: surname.trim(),
        secondSurname: secondSurname ? secondSurname.trim() : '',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        dni: dni.trim().toUpperCase(),
        obs: obs ? obs.trim() : ''
      });

      return updatedClient;

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al actualizar cliente:', error);
      throw {
        status: 500,
        message: 'Error al actualizar el cliente: ' + error.message
      };
    }
  }

  /**
   * Obtener todos los clientes o filtrados por búsqueda
   * @param {string} searchText - Texto opcional para buscar
   * @returns {Array} Lista de clientes
   */
  async getAllClients(searchText = null) {
    console.log('Buscar todos los clientes con getAllClients searchText:', searchText);
    try {
      const clients = await Client.findAll(searchText);
      return clients;
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw {
        status: 500,
        message: 'Error al obtener los clientes: ' + error.message
      };
    }
  }

  /**
   * Obtener un cliente por ID
   * @param {number} id - ID del cliente
   * @returns {Object} Cliente encontrado
   */
  async getClientById(id) {
    try {
      const client = await Client.findById(id);
      
      if (!client) {
        throw {
          status: 404,
          message: 'Cliente no encontrado'
        };
      }

      return client;
    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al obtener cliente:', error);
      throw {
        status: 500,
        message: 'Error al obtener el cliente: ' + error.message
      };
    }
  }

  /**
   * Buscar clientes por campo específico
   * @param {string} field - Campo a buscar (name, surname, secondSurname, phone, email, dni, obs)
   * @param {string} value - Valor a buscar
   * @returns {Array} Lista de clientes encontrados
   */
  async searchClientsByField(field, value) {
    // Validar campos permitidos
    const validFields = ['name', 'surname', 'secondSurname', 'phone', 'email', 'dni', 'obs'];
    
    if (!validFields.includes(field)) {
      throw {
        status: 400,
        message: `Campo inválido. Campos permitidos: ${validFields.join(', ')}`
      };
    }

    if (!value || value.trim() === '') {
      throw {
        status: 400,
        message: 'El valor de búsqueda es requerido'
      };
    }

    try {
      const clients = await Client.findByField(field, value.trim());
      return clients;
    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al buscar clientes:', error);
      throw {
        status: 500,
        message: 'Error al buscar clientes: ' + error.message
      };
    }
  }

  /**
   * Eliminar un cliente
   * @param {number} id - ID del cliente a eliminar
   * @returns {Object} Confirmación de eliminación
   */
  async deleteClient(id) {
    try {
      // Verificar que el cliente existe
      const existingClient = await Client.findById(id);
      if (!existingClient) {
        throw {
          status: 404,
          message: 'Cliente no encontrado'
        };
      }

      // Eliminar el cliente
      await Client.delete(id);

      return {
        id,
        message: 'Cliente eliminado exitosamente'
      };

    } catch (error) {
      if (error.status) {
        throw error;
      }

      console.error('Error al eliminar cliente:', error);
      throw {
        status: 500,
        message: 'Error al eliminar el cliente: ' + error.message
      };
    }
  }
}

module.exports = new ClientService();
