const express = require('express');
const router = express.Router();
const typologyController = require('../controllers/typology.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Tipologias
 *   description: Gestión de tipologías
 */

/**
 * @swagger
 * /api/tipologias:
 *   post:
 *     summary: Crear una nueva tipología
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypologyRequest'
 *     responses:
 *       201:
 *         description: Tipología creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypologyResponse'
 */
router.post('/', authMiddleware, typologyController.createTypology);

/**
 * @swagger
 * /api/tipologias/{id}:
 *   put:
 *     summary: Actualizar una tipología
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypologyRequest'
 *     responses:
 *       200:
 *         description: Tipología actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypologyResponse'
 */
router.put('/:id', authMiddleware, typologyController.updateTypology);

/**
 * @swagger
 * /api/tipologias:
 *   get:
 *     summary: Obtener todas las tipologías o filtrar por texto
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: txtSearch
 *         schema:
 *           type: string
 *         required: false
 *         description: Texto para buscar en nombre y descripción
 *     responses:
 *       200:
 *         description: Lista de tipologías
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TypologyResponse'
 */
router.get('/', authMiddleware, typologyController.getAllTypologies);

/**
 * @swagger
 * /api/tipologias/search/{field}/{value}:
 *   get:
 *     summary: Buscar tipologías por campo
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         schema:
 *           type: string
 *           enum: [nombre, descripcion]
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TypologyResponse'
 */
router.get('/search/:field/:value', authMiddleware, typologyController.searchTypologiesByField);

/**
 * @swagger
 * /api/tipologias/{id}:
 *   get:
 *     summary: Obtener una tipología por ID
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipología encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypologyResponse'
 */
router.get('/:id', authMiddleware, typologyController.getTypologyById);

/**
 * @swagger
 * /api/tipologias:
 *   delete:
 *     summary: Eliminar una tipología
 *     tags: [Tipologias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: tipologiaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipología eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 */
router.delete('/', authMiddleware, typologyController.deleteTypology);

module.exports = router;
