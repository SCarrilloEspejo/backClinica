const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const sqlConfig = {
  user: 'Orelito',
  password: 'M@rtina14052018SQL',
  server: 'orelito.database.windows.net',
  database: 'Central',
  port: 1433,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

async function runScript() {
  try {
    console.log('Conectando a la base de datos...');
    const pool = await sql.connect(sqlConfig);

    const scriptPath = path.join(__dirname, 'create_formas_pago.sql');
    const script = fs.readFileSync(scriptPath, 'utf8');

    console.log('Ejecutando script de creación de tabla formas_pago...');
    await sql.query(script);

    console.log('Tabla formas_pago creada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar el script:', error);
    process.exit(1);
  }
}

runScript();