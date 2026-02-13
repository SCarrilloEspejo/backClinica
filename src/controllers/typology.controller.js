const typologyService = require('../services/typology.service');

const createTypology = async (req, res) => {
  try {
    const data = req.body;
    const newTypology = await typologyService.createTypology(data);

    res.status(201).json({ success: true, message: 'Tipología creada exitosamente', data: newTypology });
  } catch (error) {
    console.error('Error en createTypology:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const updateTypology = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await typologyService.updateTypology(parseInt(id), data);
    res.json({ success: true, message: 'Tipología actualizada exitosamente', data: updated });
  } catch (error) {
    console.error('Error en updateTypology:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const getAllTypologies = async (req, res) => {
  try {
    const txtSearch = req.headers.txtsearch || req.headers.txtSearch || '';
    const list = await typologyService.getAllTypologies(txtSearch);
    res.json({ success: true, message: txtSearch ? 'Búsqueda completada' : 'Tipologías obtenidas exitosamente', data: list, count: list.length, search: txtSearch || null });
  } catch (error) {
    console.error('Error en getAllTypologies:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const getTypologyById = async (req, res) => {
  try {
    const { id } = req.params;
    const typ = await typologyService.getTypologyById(parseInt(id));
    res.json({ success: true, message: 'Tipología obtenida exitosamente', data: typ });
  } catch (error) {
    console.error('Error en getTypologyById:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const searchTypologiesByField = async (req, res) => {
  try {
    const { field, value } = req.params;
    const results = await typologyService.searchTypologiesByField(field, value);
    res.json({ success: true, message: 'Búsqueda completada', data: results, count: results.length });
  } catch (error) {
    console.error('Error en searchTypologiesByField:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const deleteTypology = async (req, res) => {
  try {
    const tipologiaId = req.headers.tipologiaid || req.headers.tipologiaId || req.headers.typologyid;
    if (!tipologiaId) {
      return res.status(400).json({ success: false, message: "El ID de la tipología es requerido en los headers (tipologiaId)" });
    }

    const result = await typologyService.deleteTypology(parseInt(tipologiaId));
    res.json({ success: true, message: result.message, data: { id: result.id } });
  } catch (error) {
    console.error('Error en deleteTypology:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

module.exports = {
  createTypology,
  updateTypology,
  getAllTypologies,
  getTypologyById,
  searchTypologiesByField,
  deleteTypology
};
