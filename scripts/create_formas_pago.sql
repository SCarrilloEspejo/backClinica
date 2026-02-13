/* Script para crear la tabla formas_pago en SQL Server */

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='formas_pago' AND xtype='U')
BEGIN
  CREATE TABLE formas_pago (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(500) NULL
  );
END

/* Índice para búsquedas por nombre */
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_formas_pago_nombre')
BEGIN
  CREATE INDEX IX_formas_pago_nombre ON formas_pago(nombre);
END