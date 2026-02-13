const appointmentService = require('../services/appointment.service');

/**
 * @desc Crear una nueva cita
 * @route POST /api/appointments
 * @access Private
 */
const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    console.log('Datos recibidos para crear cita:', appointmentData);
    const newAppointment = await appointmentService.createAppointment(appointmentData);

    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: newAppointment
    });

  } catch (error) {
    console.error('Error en createAppointment:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(status).json({
      success: false,
      message
    });
  }
};

/**
 * @desc Actualizar una cita
 * @route PUT /api/appointments/:id
 * @access Private
 */
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentData = req.body;
    const updatedAppointment = await appointmentService.updateAppointment(parseInt(id), appointmentData);

    res.json({
      success: true,
      message: 'Cita actualizada exitosamente',
      data: updatedAppointment
    });

  } catch (error) {
    console.error('Error en updateAppointment:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(status).json({
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener una cita por ID
 * @route GET /api/appointments/:id
 * @access Private
 */
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(parseInt(id));

    res.json({
      success: true,
      data: appointment
    });

  } catch (error) {
    console.error('Error en getAppointmentById:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(status).json({
      success: false,
      message
    });
  }
};

/**
 * @desc Obtener listado de citas con filtros
 * @route GET /api/appointments
 * @access Private
 */
const getAppointments = async (req, res) => {
  try {
    const filters = req.query; // fecha, doctoraId, estado, cobro
    const appointments = await appointmentService.getAppointments(filters);

    res.json({
      success: true,
      data: appointments
    });

  } catch (error) {
    console.error('Error en getAppointments:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(status).json({
      success: false,
      message
    });
  }
};

/**
 * @desc Eliminar una cita
 * @route DELETE /api/appointments/:id
 * @access Private
 */
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await appointmentService.deleteAppointment(parseInt(id));

    res.json({
      success: true,
      message: 'Cita eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en deleteAppointment:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(status).json({
      success: false,
      message
    });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAppointments,
  deleteAppointment
};