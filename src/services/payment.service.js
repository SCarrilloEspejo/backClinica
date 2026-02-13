const PaymentMethod = require('../models/PaymentMethod');

class PaymentService {
  async createPaymentMethod(data) {
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
      const newPayment = await PaymentMethod.create({
        nombre: nombre.trim(),
        descripcion: descripcion ? descripcion.trim() : ''
      });

      return newPayment;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al crear forma de pago:', error);
      throw { status: 500, message: 'Error al crear la forma de pago: ' + error.message };
    }
  }

  async updatePaymentMethod(id, data) {
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
      const existing = await PaymentMethod.findById(id);
      if (!existing) {
        throw { status: 404, message: 'Forma de pago no encontrada' };
      }

      const updated = await PaymentMethod.update(id, {
        nombre: nombre.trim(),
        descripcion: descripcion ? descripcion.trim() : ''
      });

      return updated;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al actualizar forma de pago:', error);
      throw { status: 500, message: 'Error al actualizar la forma de pago: ' + error.message };
    }
  }

  async getAllPaymentMethods(searchText = null) {
    try {
      const list = await PaymentMethod.findAll(searchText);
      return list;
    } catch (error) {
      console.error('Error al obtener formas de pago:', error);
      throw { status: 500, message: 'Error al obtener formas de pago: ' + error.message };
    }
  }

  async getPaymentMethodById(id) {
    try {
      const pm = await PaymentMethod.findById(id);
      if (!pm) throw { status: 404, message: 'Forma de pago no encontrada' };
      return pm;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al obtener forma de pago:', error);
      throw { status: 500, message: 'Error al obtener la forma de pago: ' + error.message };
    }
  }

  async searchPaymentMethodsByField(field, value) {
    const validFields = ['nombre', 'descripcion'];
    if (!validFields.includes(field)) {
      throw { status: 400, message: `Campo inválido. Campos permitidos: ${validFields.join(', ')}` };
    }

    if (!value || value.trim() === '') {
      throw { status: 400, message: 'El valor de búsqueda es requerido' };
    }

    try {
      const results = await PaymentMethod.findByField(field, value.trim());
      return results;
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al buscar formas de pago:', error);
      throw { status: 500, message: 'Error al buscar formas de pago: ' + error.message };
    }
  }

  async deletePaymentMethod(id) {
    try {
      const existing = await PaymentMethod.findById(id);
      if (!existing) throw { status: 404, message: 'Forma de pago no encontrada' };

      await PaymentMethod.delete(id);
      return { id, message: 'Forma de pago eliminada exitosamente' };
    } catch (error) {
      if (error.status) throw error;
      console.error('Error al eliminar forma de pago:', error);
      throw { status: 500, message: 'Error al eliminar la forma de pago: ' + error.message };
    }
  }
}

module.exports = new PaymentService();
