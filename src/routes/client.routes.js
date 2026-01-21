const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     ClientRequest:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - phone
 *         - email
 *         - dni
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 30
 *           description: Nombre del cliente
 *           example: Juan
 *         surname:
 *           type: string
 *           maxLength: 50
 *           description: Primer apellido del cliente
 *           example: García
 *         secondSurname:
 *           type: string
 *           maxLength: 50
 *           description: Segundo apellido del cliente
 *           example: López
 *         phone:
 *           type: string
 *           maxLength: 10
 *           description: Teléfono del cliente (máximo 10 caracteres)
 *           example: "612345678"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 60
 *           description: Email del cliente
 *           example: juan.garcia@example.com
 *         dni:
 *           type: string
 *           maxLength: 20
 *           description: DNI del cliente
 *           example: 12345678A
 *         obs:
 *           type: string
 *           maxLength: 150
 *           description: Observaciones adicionales
 *           example: Cliente VIP
 *     ClientResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Juan
 *         surname:
 *           type: string
 *           example: García
 *         secondSurname:
 *           type: string
 *           example: López
 *         phone:
 *           type: string
 *           example: "612345678"
 *         email:
 *           type: string
 *           example: juan.garcia@example.com
 *         dni:
 *           type: string
 *           example: 12345678A
 *         obs:
 *           type: string
 *           example: Cliente VIP
 *     ClientSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Cliente creado exitosamente
 *         data:
 *           $ref: '#/components/schemas/ClientResponse'
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente en la base de datos. Requiere autenticación.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientRequest'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientSuccessResponse'
 *       400:
 *         description: Datos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email o DNI ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', authMiddleware, clientController.createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza la información de un cliente existente. Requiere autenticación.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientRequest'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientSuccessResponse'
 *       400:
 *         description: Datos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email o DNI ya registrado en otro cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authMiddleware, clientController.updateClient);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtener todos los clientes o buscar con filtro global
 *     description: Retorna una lista de todos los clientes. Si se envía el header 'txtSearch', filtra por todos los campos de la tabla.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: txtSearch
 *         schema:
 *           type: string
 *         required: false
 *         description: Texto para buscar en todos los campos (name, surname, secondSurname, phone, email, dni, obs)
 *         example: Garcia
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Clientes obtenidos exitosamente
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClientResponse'
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 search:
 *                   type: string
 *                   nullable: true
 *                   example: Garcia
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', authMiddleware, clientController.getAllClients);

/**
 * @swagger
 * /api/clients/search/{field}/{value}:
 *   get:
 *     summary: Buscar clientes por campo
 *     description: Busca clientes por cualquier campo (name, surname, secondSurname, phone, email, dni, obs). Búsqueda parcial tipo LIKE.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         schema:
 *           type: string
 *           enum: [name, surname, secondSurname, phone, email, dni, obs]
 *         description: Campo por el cual buscar
 *         example: surname
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor a buscar (búsqueda parcial)
 *         example: Garcia
 *     responses:
 *       200:
 *         description: Búsqueda completada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Búsqueda completada
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClientResponse'
 *                 count:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Campo inválido o valor vacío
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search/:field/:value', authMiddleware, clientController.searchClientsByField);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Retorna la información de un cliente específico. Requiere autenticación.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientSuccessResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authMiddleware, clientController.getClientById);

/**
 * @swagger
 * /api/clients:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente de la base de datos. El ID del cliente se envía en el header 'clientId'. Requiere autenticación.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cliente eliminado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: ID no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/', authMiddleware, clientController.deleteClient);

module.exports = router;
