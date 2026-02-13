/* Script para crear la tabla tipologias en SQL Server */

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='tipologias' AND xtype='U')
BEGIN
  CREATE TABLE tipologias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(500) NULL
  );
END

/* Índice para búsquedas por nombre */
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_tipologias_nombre')
BEGIN
  CREATE INDEX IX_tipologias_nombre ON tipologias(nombre);
END
