const express = require('express');
const { check } = require('express-validator');
const { escape } = require('validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const roleMiddleware = require('../middlewares/RoleMiddleware');
const evaluationEmployeeController = require('../controllers/EvaluationEmployeeController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: EvaluationEmployees
 *   description: Operaciones relacionadas con las evaluaciones de empleados.
 */

/**
 * @swagger
 * /evaluation-employees:
 *   post:
 *     tags: [EvaluationEmployees]
 *     summary: Crear una nueva evaluación para un empleado
 *     description: Crea una nueva evaluación asignada a un empleado. Requiere autenticación y validación de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee:
 *                 type: string
 *                 description: ID del empleado que recibirá la evaluación.
 *               evaluation:
 *                 type: string
 *                 description: ID de la evaluación que se asigna al empleado.
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de preguntas para la evaluación.
 *             required:
 *               - employee
 *               - evaluation
 *               - questions
 *     responses:
 *       201:
 *         description: Evaluación para el empleado creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la evaluación para el empleado creada.
 *                 employee:
 *                   type: string
 *                   description: ID del empleado.
 *                 evaluation:
 *                   type: string
 *                   description: ID de la evaluación.
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de preguntas.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/', 
    [
        check('employee').trim().escape(),
        check('evaluation').trim().escape(),
        check('questions').isArray().withMessage('Questions must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ],
    authMiddleware, roleMiddleware(['admin', 'manager']), evaluationEmployeeController.createEvaluationemployee);

/**
 * @swagger
 * /evaluation-employees/{id}/submit:
 *   post:
 *     tags: [EvaluationEmployees]
 *     summary: Completar la evaluación de un empleado
 *     description: Marca la evaluación de un empleado como completada. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evaluación del empleado a completar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evaluación del empleado completada exitosamente.
 *       404:
 *         description: Evaluación del empleado no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/:id/submit', authMiddleware, evaluationEmployeeController.completeEvaluationEmployee);

/**
 * @swagger
 * /evaluation-employees/{id}:
 *   get:
 *     tags: [EvaluationEmployees]
 *     summary: Obtener evaluación de un empleado por ID
 *     description: Recupera los detalles de una evaluación de empleado específica por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evaluación del empleado a recuperar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la evaluación del empleado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la evaluación del empleado.
 *                 employee:
 *                   type: string
 *                   description: ID del empleado.
 *                 evaluation:
 *                   type: string
 *                   description: ID de la evaluación.
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de preguntas.
 *       404:
 *         description: Evaluación del empleado no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/:id', authMiddleware, evaluationEmployeeController.getEvaluationemployeeById);

/**
 * @swagger
 * /evaluation-employees/{id}/respond:
 *   post:
 *     tags: [EvaluationEmployees]
 *     summary: Responder a una evaluación de un empleado
 *     description: Envía las respuestas de un empleado para una evaluación específica. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evaluación del empleado para la cual se enviarán las respuestas.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee:
 *                 type: string
 *                 description: ID del empleado que responde a la evaluación.
 *               evaluation:
 *                 type: string
 *                 description: ID de la evaluación.
 *             required:
 *               - employee
 *               - evaluation
 *     responses:
 *       200:
 *         description: Respuestas enviadas exitosamente.
 *       404:
 *         description: Evaluación del empleado no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/:id/respond', 
    [
        check('employee').trim().escape(),
        check('evaluation').trim().escape()
    ],
    authMiddleware, roleMiddleware(['admin', 'employee']), evaluationEmployeeController.respondEvaluationEmployee);

module.exports = router;
