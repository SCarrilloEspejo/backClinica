const clientService = require('../services/client.service');

/**
 * @desc Crear un nuevo cliente
 * @route POST /api/clients
 * @access Private
 */
const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.createClient(clientData);

    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: newClient
    });

  } catch (error) {
    console.error('Error en createClient:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Actualizar un cliente
 * @route PUT /api/clients/:id
 * @access Private
 */
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const updatedClient = await clientService.updateClient(parseInt(id), clientData);

    res.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: updatedClient
    });

  } catch (error) {
    console.error('Error en updateClient:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener todos los clientes o filtrados por búsqueda
 * @route GET /api/clients
 * @access Private
 */
const getAllClients = async (req, res) => {
  try {
    // Obtener el parámetro de búsqueda desde los headers
    const txtSearch = req.headers.txtsearch || req.headers.txtSearch || '';
    
    const clients = await clientService.getAllClients(txtSearch);

    res.json({
      success: true,
      message: txtSearch ? 'Búsqueda completada' : 'Clientes obtenidos exitosamente',
      data: clients,
      count: clients.length,
      search: txtSearch || null
    });

  } catch (error) {
    console.error('Error en getAllClients:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener un cliente por ID
 * @route GET /api/clients/:id
 * @access Private
 */
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.getClientById(parseInt(id));

    res.json({
      success: true,
      message: 'Cliente obtenido exitosamente',
      data: client
    });

  } catch (error) {
    console.error('Error en getClientById:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Buscar clientes por campo específico
 * @route GET /api/clients/search/:field/:value
 * @access Private
 */
const searchClientsByField = async (req, res) => {
  try {
    const { field, value } = req.params;
    const clients = await clientService.searchClientsByField(field, value);

    res.json({
      success: true,
      message: `Búsqueda completada`,
      data: clients,
      count: clients.length
    });

  } catch (error) {
    console.error('Error en searchClientsByField:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

/**
 * @desc Eliminar un cliente
 * @route DELETE /api/clients
 * @access Private
 */
const deleteClient = async (req, res) => {
  try {
    // Obtener el ID desde los headers
    const clientId = req.headers.clientid || req.headers.clientId;
    
    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cliente es requerido en los headers (clientId)'
      });
    }

    const result = await clientService.deleteClient(parseInt(clientId));

    res.json({
      success: true,
      message: result.message,
      data: { id: result.id }
    });

  } catch (error) {
    console.error('Error en deleteClient:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({ 
      success: false,
      message
    });
  }
};

module.exports = {
  createClient,
  updateClient,
  getAllClients,
  getClientById,
  searchClientsByField,
  deleteClient
};
