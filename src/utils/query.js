const sql = require('mssql'); // MS Sql Server client

const sqlConfigWeb = {
  user: 'Orelito',
  password: 'M@rtina14052018SQL',
  server: 'orelito.database.windows.net',
  database: 'Central',
  port: 1433,
  dialect: "mssql",
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};
 /* CONFIGURADCION 2022 */
 /* const sqlConfigWeb = {
  user: 'sa',
  password: 'Adm1n2025',
  server: '127.0.0.1',
  database: 'Orelito',
  port: 14333,
  dialect: "mssql",
  options: {
    encrypt: false,
    enableArithAbort: true
  } 
};/*
/* const sqlConfig = {
  user: 'Orelito',
  password: 'M@rtina14052018',
  server: 'localhost',
  database: 'JOYERIA',
  port: 1433,
  dialect: "mssql",
  options: {
    encrypt: false,
    enableArithAbort: true
  } */
 /* CONFIGURADCION 2022 */
  /*   const sqlConfig = {
      user: 'sa',
      password: 'Adm1n2025',
      server: '127.0.0.1',
      database: 'COMPOSTURA',
      port: 14333,
      dialect: "mssql",
      options: {
        encrypt: false,
        enableArithAbort: true
      } 
};/* 
const sqlConfig = {
  user: 'sa',
  password: 'Orelito',
  server: 'M@rtina14052018',
  database: 'COMPOSTURA',
  port: 1433,
  dialect: "mssql",
  options: {
    encrypt: false,
    enableArithAbort: true
  }
}; */
async function myQuery(strsql) {
  try {
    console.info('SQL --> ', strsql);
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();
    const request = pool.request();
    const result = await request.query(strsql);
    pool.close();
    return result;
  } catch (error) {
    console.error('Error in myQuery:', error, 'QUERY ->', strsql);
  }
}

async function myQueryWeb(strsql) {
  try {
    console.info('SQL WEB --> ', strsql);
    const pool = new sql.ConnectionPool(sqlConfigWeb);
    await pool.connect();
    const request = pool.request();
    const result = await request.query(strsql);
    pool.close();
    return result;
  } catch (error) {
    console.error('Error in myQuery:', error, 'myQuery ->', strsql);
  }
}

exports.myQuery = myQuery;
exports.myQueryWeb = myQueryWeb;
