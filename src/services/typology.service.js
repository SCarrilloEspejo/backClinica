const Typology = require('../models/Typology');

class TypologyService {
  async createTypology(data) {
    const { nombre, descripcion } = data;

    if (!nombre || nombre.trim() === '') {
      throw { status: 400, message: 'El campo nombre es requerido' };
    }

    if (nombre.trim().length > 150) {
      throw { status: 400, message: 'El campo nombre no puede tener más de 150 caracteres' };
    }

    if (descripcion && descripcion.trim().length > 500) {
      throw { status: 400, message: 'El campo descripcion no puede tener más de 500 caracteres' };
    }

    try {
      const newTypology = await Typology.create({
        nombre: nombre.trim(),
        descripcion: descripcion ? descripcion.trim() : ''
      });

      return newTypology;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al crear tipología:', error);
      throw { status: 500, message: 'Error al crear la tipología: ' + error.message };
    }
  }

  async updateTypology(id, data) {
    const { nombre, descripcion } = data;

    if (!nombre || nombre.trim() === '') {
      throw { status: 400, message: 'El campo nombre es requerido' };
    }

    if (nombre.trim().length > 150) {
      throw { status: 400, message: 'El campo nombre no puede tener más de 150 caracteres' };
    }

    if (descripcion && descripcion.trim().length > 500) {
      throw { status: 400, message: 'El campo descripcion no puede tener más de 500 caracteres' };
    }

    try {
      const existing = await Typology.findById(id);
      if (!existing) {
        throw { status: 404, message: 'Tipología no encontrada' };
      }

      const updated = await Typology.update(id, {
        nombre: nombre.trim(),
        descripcion: descripcion ? descripcion.trim() : ''
      });

      return updated;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al actualizar tipología:', error);
      throw { status: 500, message: 'Error al actualizar la tipología: ' + error.message };
    }
  }

  async getAllTypologies(searchText = null) {
    try {
      const list = await Typology.findAll(searchText);
      return list;
    } catch (error) {
      console.error('Error al obtener tipologías:', error);
      throw { status: 500, message: 'Error al obtener tipologías: ' + error.message };
    }
  }

  async getTypologyById(id) {
    try {
      const typ = await Typology.findById(id);
      if (!typ) throw { status: 404, message: 'Tipología no encontrada' };
      return typ;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al obtener tipología:', error);
      throw { status: 500, message: 'Error al obtener la tipología: ' + error.message };
    }
  }

  async searchTypologiesByField(field, value) {
    const validFields = ['nombre', 'descripcion'];
    if (!validFields.includes(field)) {
      throw { status: 400, message: `Campo inválido. Campos permitidos: ${validFields.join(', ')}` };
    }

    if (!value || value.trim() === '') {
      throw { status: 400, message: 'El valor de búsqueda es requerido' };
    }

    try {
      const results = await Typology.findByField(field, value.trim());
      return results;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al buscar tipologías:', error);
      throw { status: 500, message: 'Error al buscar tipologías: ' + error.message };
    }
  }

  async deleteTypology(id) {
    try {
      const existing = await Typology.findById(id);
      if (!existing) throw { status: 404, message: 'Tipología no encontrada' };

      await Typology.delete(id);
      return { id, message: 'Tipología eliminada exitosamente' };
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al eliminar tipología:', error);
      throw { status: 500, message: 'Error al eliminar la tipología: ' + error.message };
    }
  }
}

module.exports = new TypologyService();
