const Query = require('../utils/query');

class PaymentMethod {
  static async create(data) {
    const { nombre, descripcion } = data;

    const query = `
      INSERT INTO formas_pago (nombre, descripcion)
      OUTPUT INSERTED.id
      VALUES ('${nombre}', '${descripcion || ''}')
    `;

    const result = await Query.myQueryWeb(query);
    const insertedId = result.recordset[0].id;

    return {
      id: insertedId,
      nombre,
      descripcion
    };
  }

  static async update(id, data) {
    const { nombre, descripcion } = data;

    const query = `
      UPDATE formas_pago
      SET nombre = '${nombre}',
          descripcion = '${descripcion || ''}'
      WHERE id = ${id}
    `;

    await Query.myQueryWeb(query);

    return {
      id,
      nombre,
      descripcion
    };
  }

  static async findById(id) {
    const query = `SELECT * FROM formas_pago WHERE id = ${id}`;
    const result = await Query.myQueryWeb(query);
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  static async findByField(field, value) {
    const validFields = ['nombre', 'descripcion'];
    if (!validFields.includes(field)) {
      throw new Error(`Campo inválido: ${field}`);
    }

    const query = `SELECT * FROM formas_pago WHERE ${field} LIKE '%${value}%'`;
    const result = await Query.myQueryWeb(query);
    return result.recordset || [];
  }

  static async findAll(searchText = null) {
    let query;
    if (searchText && searchText.trim() !== '') {
      const s = searchText.trim();
      query = `SELECT * FROM formas_pago WHERE nombre LIKE '%${s}%' OR descripcion LIKE '%${s}%' ORDER BY id DESC`;
    } else {
      query = `SELECT * FROM formas_pago ORDER BY id DESC`;
    }

    const result = await Query.myQueryWeb(query);
    return result.recordset || [];
  }

  static async delete(id) {
    const query = `DELETE FROM formas_pago WHERE id = ${id}`;
    await Query.myQueryWeb(query);
    return true;
  }
}

module.exports = PaymentMethod;
