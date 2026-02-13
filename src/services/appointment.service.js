const Appointment = require('../models/Appointment');

class AppointmentService {
  /**
   * Crear una nueva cita
   * @param {Object} appointmentData - Datos de la cita
   * @returns {Object} Cita creada
   */
  async createAppointment(appointmentData) {
    const {
      doctoraId,
      pacienteNombre,
      pacienteTelefono,
      pacienteEmail,
      tipologiaId,
      formaPagoId,
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin
    } = appointmentData;

    // Validar campos requeridos
    if (doctoraId === null || doctoraId === undefined || !pacienteNombre || tipologiaId === null || tipologiaId === undefined || formaPagoId === null || formaPagoId === undefined || !fechaInicio || !horaInicio || !fechaFin || !horaFin) {
      throw {
        status: 400,
        message: 'Los campos doctoraId, pacienteNombre, tipologiaId, formaPagoId, fechaInicio, horaInicio, fechaFin y horaFin son requeridos'
      };
    }

    try {
      const appointment = await Appointment.create(appointmentData);
      return appointment;
    } catch (error) {
      throw {
        status: 500,
        message: 'Error al crear la cita',
        error: error.message
      };
    }
  }

  /**
   * Actualizar una cita
   * @param {number} id - ID de la cita
   * @param {Object} appointmentData - Datos a actualizar
   * @returns {Object} Cita actualizada
   */
  async updateAppointment(id, appointmentData) {
    if (!id) {
      throw {
        status: 400,
        message: 'ID de cita requerido'
      };
    }

    try {
      const existingAppointment = await Appointment.findById(id);
      if (!existingAppointment) {
        throw {
          status: 404,
          message: 'Cita no encontrada'
        };
      }

      const updatedAppointment = await Appointment.update(id, appointmentData);
      return updatedAppointment;
    } catch (error) {
      if (error.status) throw error;
      throw {
        status: 500,
        message: 'Error al actualizar la cita',
        error: error.message
      };
    }
  }

  /**
   * Obtener una cita por ID
   * @param {number} id - ID de la cita
   * @returns {Object} Cita encontrada
   */
  async getAppointmentById(id) {
    if (!id) {
      throw {
        status: 400,
        message: 'ID de cita requerido'
      };
    }

    try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw {
          status: 404,
          message: 'Cita no encontrada'
        };
      }
      return appointment;
    } catch (error) {
      if (error.status) throw error;
      throw {
        status: 500,
        message: 'Error al obtener la cita',
        error: error.message
      };
    }
  }

  /**
   * Obtener listado de citas con filtros
   * @param {Object} filters - Filtros opcionales
   * @returns {Array} Lista de citas
   */
  async getAppointments(filters = {}) {
    try {
      const appointments = await Appointment.findAll(filters);
      return appointments;
    } catch (error) {
      throw {
        status: 500,
        message: 'Error al obtener las citas',
        error: error.message
      };
    }
  }

  /**
   * Eliminar una cita
   * @param {number} id - ID de la cita
   * @returns {boolean} True si eliminada
   */
  async deleteAppointment(id) {
    if (!id) {
      throw {
        status: 400,
        message: 'ID de cita requerido'
      };
    }

    try {
      const existingAppointment = await Appointment.findById(id);
      if (!existingAppointment) {
        throw {
          status: 404,
          message: 'Cita no encontrada'
        };
      }

      await Appointment.delete(id);
      return true;
    } catch (error) {
      if (error.status) throw error;
      throw {
        status: 500,
        message: 'Error al eliminar la cita',
        error: error.message
      };
    }
  }
}

module.exports = new AppointmentService();