const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: FormasPago
 *   description: Gestión de formas de pago
 */

/**
 * @swagger
 * /api/formas-pago:
 *   post:
 *     summary: Crear una nueva forma de pago
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethodRequest'
 *     responses:
 *       201:
 *         description: Forma de pago creada exitosamente
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
 *                   example: Forma de pago creada exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethodResponse'
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', authMiddleware, paymentController.createPaymentMethod);
/**
 * @swagger
 * /api/formas-pago/{id}:
 *   put:
 *     summary: Actualizar una forma de pago existente
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethodRequest'
 *     responses:
 *       200:
 *         description: Forma de pago actualizada exitosamente
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
 *                   example: Forma de pago actualizada exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethodResponse'
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authMiddleware, paymentController.updatePaymentMethod);
/**
 * @swagger
 * /api/formas-pago:
 *   get:
 *     summary: Obtener todas las formas de pago
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: txtsearch
 *         schema:
 *           type: string
 *         description: Texto de búsqueda opcional
 *     responses:
 *       200:
 *         description: Lista de formas de pago obtenida exitosamente
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
 *                   example: Formas de pago obtenidas exitosamente
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PaymentMethodResponse'
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 search:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', authMiddleware, paymentController.getAllPaymentMethods);
/**
 * @swagger
 * /api/formas-pago/search/{field}/{value}:
 *   get:
 *     summary: Buscar formas de pago por campo y valor
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         schema:
 *           type: string
 *         description: Campo por el que buscar
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor a buscar
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
 *                     $ref: '#/components/schemas/PaymentMethodResponse'
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search/:field/:value', authMiddleware, paymentController.searchPaymentMethodsByField);
/**
 * @swagger
 * /api/formas-pago/{id}:
 *   get:
 *     summary: Obtener una forma de pago por ID
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago
 *     responses:
 *       200:
 *         description: Forma de pago obtenida exitosamente
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
 *                   example: Forma de pago obtenida exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/PaymentMethodResponse'
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authMiddleware, paymentController.getPaymentMethodById);
/**
 * @swagger
 * /api/formas-pago:
 *   delete:
 *     summary: Eliminar una forma de pago
 *     tags: [FormasPago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago a eliminar
 *     responses:
 *       200:
 *         description: Forma de pago eliminada exitosamente
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
 *                   example: Forma de pago eliminada exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/', authMiddleware, paymentController.deletePaymentMethod);

module.exports = router;
