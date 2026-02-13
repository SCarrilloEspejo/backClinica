const Query = require('../utils/query');

class Appointment {
  /**
   * Crear una nueva cita en la base de datos
   * @param {Object} appointmentData - Datos de la cita
   * @returns {Object} Cita creada con su ID
   */
  static async create(appointmentData) {
    const {
      doctoraId,
      pacienteId,
      pacienteNombre,
      pacienteTelefono,
      pacienteEmail,
      tipologiaId,
      formaPagoId,
      estado,
      notasClinicas,
      costo,
      importe,
      moneda,
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin
    } = appointmentData;

    // Usar fechaInicio como fecha, asumir fechaFin = fechaInicio
    const fecha = fechaInicio;

    let query = `
      INSERT INTO appointments (doctoraId, pacienteId, pacienteNombre, pacienteTelefono, pacienteEmail, tipologiaId, formaPagoId, estado, notasClinicas, costo, importe, moneda, fecha, horaInicio, horaFin)
      OUTPUT INSERTED.id
      VALUES (${doctoraId}, `;
    
    if (pacienteId !== null && pacienteId !== undefined) {
      query += `${pacienteId}, `;
    } else {
      query += `NULL, `;
    }
    
    query += `'${pacienteNombre}', '${pacienteTelefono || ''}', '${pacienteEmail || ''}', ${tipologiaId}, ${formaPagoId}, '${estado}', '${notasClinicas || ''}', ${costo || 0}, ${importe || 0}, '${moneda}', '${fecha}', '${horaInicio}', '${horaFin}')
    `;

    const result = await Query.myQueryWeb(query);
    const insertedId = result.recordset[0].id;

    return {
      id: insertedId,
      ...appointmentData,
      fecha,
      horaInicio,
      horaFin
    };
  }

  /**
   * Actualizar una cita existente
   * @param {number} id - ID de la cita
   * @param {Object} appointmentData - Datos a actualizar
   * @returns {Object} Cita actualizada
   */
  static async update(id, appointmentData) {
    const {
      doctoraId,
      pacienteId,
      pacienteNombre,
      pacienteTelefono,
      pacienteEmail,
      tipologiaId,
      formaPagoId,
      estado,
      notasClinicas,
      costo,
      importe,
      moneda,
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin
    } = appointmentData;

    const fecha = fechaInicio;

    let query = `
      UPDATE appointments
      SET doctoraId = ${doctoraId}, `;
    
    if (pacienteId !== null && pacienteId !== undefined) {
      query += `pacienteId = ${pacienteId}, `;
    } else {
      query += `pacienteId = NULL, `;
    }
    
    query += `pacienteNombre = '${pacienteNombre}',
          pacienteTelefono = '${pacienteTelefono || ''}',
          pacienteEmail = '${pacienteEmail || ''}',
          tipologiaId = ${tipologiaId},
          formaPagoId = ${formaPagoId},
          estado = '${estado}',
          notasClinicas = '${notasClinicas || ''}',
          costo = ${costo || 0},
          importe = ${importe || 0},
          moneda = '${moneda}',
          fecha = '${fecha}',
          horaInicio = '${horaInicio}',
          horaFin = '${horaFin}'
      WHERE id = ${id}
    `;

    await Query.myQueryWeb(query);

    return {
      id,
      ...appointmentData,
      fecha,
      horaInicio,
      horaFin
    };
  }

  /**
   * Obtener una cita por ID
   * @param {number} id - ID de la cita
   * @returns {Object|null} Cita encontrada o null
   */
  static async findById(id) {
    const query = `
      SELECT * FROM appointments WHERE id = ${id}
    `;

    const result = await Query.myQueryWeb(query);
    return result.recordset[0] || null;
  }

  /**
   * Obtener listado de citas con filtros
   * @param {Object} filters - Filtros opcionales
   * @returns {Array} Lista de citas
   */
  static async findAll(filters = {}) {
    let query = `
      SELECT 
        a.id,
        a.doctoraId,
        a.pacienteId,
        a.pacienteNombre,
        a.pacienteTelefono,
        a.pacienteEmail,
        a.tipologiaId,
        a.formaPagoId,
        a.estado,
        a.notasClinicas,
        a.costo,
        a.moneda,
        CONVERT(varchar(10), a.fecha, 120) as fechaInicio,
        CONVERT(varchar(10), a.fecha, 120) as fechaFin,
        CONVERT(varchar(5), a.horaInicio, 108) as horaInicio,
        CONVERT(varchar(5), a.horaFin, 108) as horaFin,
        u.name as doctoraNombre,
        u.surname as doctoraApellido,
        u.color as doctoraColor
      FROM appointments a
      LEFT JOIN users u ON a.doctoraId = u.id
      WHERE 1=1
    `;

    if (filters.fecha) {
      query += ` AND a.fecha = '${filters.fecha}'`;
    }
    if (filters.doctoraId) {
      query += ` AND a.doctoraId = ${filters.doctoraId}`;
    }
    if (filters.estado) {
      query += ` AND a.estado = '${filters.estado}'`;
    }
    if (filters.cobro) {
      // Asumir que cobro es si costo > 0
      query += ` AND a.costo > 0`;
    }

    query += ` ORDER BY a.fecha DESC, a.horaInicio DESC`;

    const result = await Query.myQueryWeb(query);
    return result.recordset;
  }

  /**
   * Eliminar una cita por ID
   * @param {number} id - ID de la cita
   * @returns {boolean} True si eliminada
   */
  static async delete(id) {
    const query = `DELETE FROM appointments WHERE id = ${id}`;
    await Query.myQueryWeb(query);
    return true;
  }
}

module.exports = Appointment;