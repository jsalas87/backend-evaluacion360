const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const roleMiddleware = require('../middlewares/RoleMiddleware');
const { createEvaluation, listEvaluations, getEvaluationById, updateEvaluation } = require('../controllers/EvaluationController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Evaluations
 *   description: Operaciones relacionadas con las evaluaciones.
 */

/**
 * @swagger
 * /evaluations:
 *   post:
 *     tags: [Evaluations]
 *     summary: Crear una nueva evaluación
 *     description: Crea una nueva evaluación en el sistema. Requiere autenticación y validación de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *                 description: Periodo de la evaluación.
 *               type:
 *                 type: string
 *                 description: Tipo de evaluación.
 *             required:
 *               - period
 *               - type
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la evaluación creada.
 *                 period:
 *                   type: string
 *                   description: Periodo de la evaluación.
 *                 type:
 *                   type: string
 *                   description: Tipo de evaluación.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/', 
    [
        check('period').trim().escape(),
        check('type').trim().escape()
    ],
    authMiddleware, roleMiddleware(['admin']), createEvaluation);

/**
 * @swagger
 * /evaluations:
 *   get:
 *     tags: [Evaluations]
 *     summary: Obtener todas las evaluaciones
 *     description: Recupera una lista de todas las evaluaciones. Requiere autenticación.
 *     responses:
 *       200:
 *         description: Lista de evaluaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la evaluación.
 *                   period:
 *                     type: string
 *                     description: Periodo de la evaluación.
 *                   type:
 *                     type: string
 *                     description: Tipo de evaluación.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/', authMiddleware, roleMiddleware(['admin', 'manager']), listEvaluations);

/**
 * @swagger
 * /evaluations/{id}:
 *   get:
 *     tags: [Evaluations]
 *     summary: Obtener una evaluación por ID
 *     description: Recupera los detalles de una evaluación específica por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la evaluación a recuperar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la evaluación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la evaluación.
 *                 period:
 *                   type: string
 *                   description: Periodo de la evaluación.
 *                 type:
 *                   type: string
 *                   description: Tipo de evaluación.
 *       404:
 *         description: Evaluación no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), getEvaluationById);

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     tags: [Evaluations]
 *     summary: Actualizar una evaluación por ID
 *     description: Actualiza los detalles de una evaluación existente por su ID. Requiere autenticación y validación de datos.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la evaluación a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *                 description: Periodo de la evaluación.
 *               type:
 *                 type: string
 *                 description: Tipo de evaluación.
 *             required:
 *               - period
 *               - type
 *     responses:
 *       200:
 *         description: Evaluación actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la evaluación actualizada.
 *                 period:
 *                   type: string
 *                   description: Periodo de la evaluación.
 *                 type:
 *                   type: string
 *                   description: Tipo de evaluación.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       404:
 *         description: Evaluación no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.put('/:id', 
    [
        check('period').trim().escape(),
        check('type').trim().escape()
    ],
    authMiddleware, updateEvaluation);

module.exports = router;


