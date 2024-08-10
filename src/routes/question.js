const express = require('express');
const { check } = require('express-validator');
const { escape } = require('validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createQuestion, listQuestions, updateQuestion } = require('../controllers/QuestionController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Operaciones relacionadas con preguntas.
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     tags: [Questions]
 *     summary: Crear una nueva pregunta
 *     description: Crea una nueva pregunta con el texto, tipo y opciones especificadas. Requiere autenticación y validación de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto de la pregunta.
 *               type:
 *                 type: string
 *                 description: Tipo de pregunta (por ejemplo, 'multiple-choice', 'text').
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Opciones disponibles para la pregunta (solo aplicable para preguntas de opción múltiple).
 *             required:
 *               - text
 *               - type
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la pregunta creada.
 *                 text:
 *                   type: string
 *                   description: Texto de la pregunta.
 *                 type:
 *                   type: string
 *                   description: Tipo de pregunta.
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Opciones disponibles para la pregunta.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/', 
    [
        check('text').trim().escape(),
        check('type').trim().escape(),
        check('options').isArray().withMessage('Options must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ],
    authMiddleware, createQuestion);

/**
 * @swagger
 * /questions:
 *   get:
 *     tags: [Questions]
 *     summary: Listar todas las preguntas
 *     description: Recupera una lista de todas las preguntas disponibles. Requiere autenticación.
 *     responses:
 *       200:
 *         description: Lista de preguntas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la pregunta.
 *                   text:
 *                     type: string
 *                     description: Texto de la pregunta.
 *                   type:
 *                     type: string
 *                     description: Tipo de pregunta.
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Opciones disponibles para la pregunta.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/', authMiddleware, listQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     tags: [Questions]
 *     summary: Actualizar una pregunta existente
 *     description: Actualiza los detalles de una pregunta existente especificada por su ID. Requiere autenticación y validación de datos.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la pregunta a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto de la pregunta.
 *               type:
 *                 type: string
 *                 description: Tipo de pregunta (por ejemplo, 'multiple-choice', 'text').
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Opciones disponibles para la pregunta (solo aplicable para preguntas de opción múltiple).
 *             required:
 *               - text
 *               - type
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la pregunta actualizada.
 *                 text:
 *                   type: string
 *                   description: Texto de la pregunta.
 *                 type:
 *                   type: string
 *                   description: Tipo de pregunta.
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Opciones disponibles para la pregunta.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       404:
 *         description: Pregunta no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.put('/:id',
    [
        check('text').trim().escape(),
        check('type').trim().escape(),
        check('options').isArray().withMessage('Options must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ], 
    authMiddleware, updateQuestion);

module.exports = router;

