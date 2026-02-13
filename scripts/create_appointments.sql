/* Script para crear la tabla appointments en SQL Server */

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='appointments' AND xtype='U')
BEGIN
  CREATE TABLE appointments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    doctoraId INT NOT NULL,
    pacienteId INT NULL,
    pacienteNombre NVARCHAR(255) NOT NULL,
    pacienteTelefono NVARCHAR(20) NULL,
    pacienteEmail NVARCHAR(255) NULL,
    tipologiaId INT NOT NULL,
    formaPagoId INT NOT NULL,
    estado NVARCHAR(50) DEFAULT 'pendiente',
    notasClinicas NVARCHAR(MAX) NULL,
    costo DECIMAL(10,2) DEFAULT 0.00,
    importe DECIMAL(10,2) DEFAULT 0.00,
    moneda NVARCHAR(10) DEFAULT 'EUR',
    fecha DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL
  );
END
ELSE
BEGIN
  -- Agregar columna importe si no existe
  IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='appointments' AND COLUMN_NAME='importe')
  BEGIN
    ALTER TABLE appointments ADD importe DECIMAL(10,2) DEFAULT 0.00;
  END
END

/* Índices para búsquedas comunes */
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_doctoraId')
BEGIN
  CREATE INDEX IX_appointments_doctoraId ON appointments(doctoraId);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_pacienteId')
BEGIN
  CREATE INDEX IX_appointments_pacienteId ON appointments(pacienteId);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_estado')
BEGIN
  CREATE INDEX IX_appointments_estado ON appointments(estado);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_fecha')
BEGIN
  CREATE INDEX IX_appointments_fecha ON appointments(fecha);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_horaInicio')
BEGIN
  CREATE INDEX IX_appointments_horaInicio ON appointments(horaInicio);
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_appointments_horaFin')
BEGIN
  CREATE INDEX IX_appointments_horaFin ON appointments(horaFin);
END