const Query = require('../utils/query');

class Typology {
  static async create(typologyData) {
    const { nombre, descripcion } = typologyData;

    const query = `
      INSERT INTO tipologias (nombre, descripcion)
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

  static async update(id, typologyData) {
    const { nombre, descripcion } = typologyData;

    const query = `
      UPDATE tipologias
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
    const query = `SELECT * FROM tipologias WHERE id = ${id}`;
    const result = await Query.myQueryWeb(query);
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  static async findByField(field, value) {
    const validFields = ['nombre', 'descripcion'];
    if (!validFields.includes(field)) {
      throw new Error(`Campo inválido: ${field}`);
    }

    const query = `SELECT * FROM tipologias WHERE ${field} LIKE '%${value}%'`;
    const result = await Query.myQueryWeb(query);
    return result.recordset || [];
  }

  static async findAll(searchText = null) {
    let query;
    if (searchText && searchText.trim() !== '') {
      const s = searchText.trim().replace(/'/g, "''");
      query = `SELECT * FROM tipologias WHERE nombre LIKE '%${s}%' OR descripcion LIKE '%${s}%' ORDER BY id DESC`;
    } else {
      query = `SELECT * FROM tipologias ORDER BY id DESC`;
    }

    const result = await Query.myQueryWeb(query);
    return result.recordset || [];
  }

  static async delete(id) {
    const query = `DELETE FROM tipologias WHERE id = ${id}`;
    await Query.myQueryWeb(query);
    return true;
  }
}

module.exports = Typology;
