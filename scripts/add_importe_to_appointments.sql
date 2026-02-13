/* Script para agregar la columna importe a la tabla appointments */

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='appointments' AND COLUMN_NAME='importe')
BEGIN
  ALTER TABLE appointments ADD importe DECIMAL(10,2) DEFAULT 0.00;
  PRINT 'Columna importe agregada a la tabla appointments';
END
ELSE
BEGIN
  PRINT 'La columna importe ya existe en la tabla appointments';
END
