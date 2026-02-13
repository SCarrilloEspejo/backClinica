/* Script para insertar datos de ejemplo en tipologias y formas_pago */

-- Insertar tipologias
INSERT INTO tipologias (nombre, descripcion) VALUES
('Consulta', 'Consulta médica general'),
('Revisión', 'Revisión periódica'),
('Urgencia', 'Consulta de urgencia');

-- Insertar formas de pago
INSERT INTO formas_pago (nombre, descripcion) VALUES
('Efectivo', 'Pago en efectivo'),
('Tarjeta', 'Pago con tarjeta de crédito o débito'),
('Transferencia', 'Pago mediante transferencia bancaria');