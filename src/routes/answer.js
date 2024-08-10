const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createAnswer, getAnswerById, updateAnswer } = require('../controllers/AnswerController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Operaciones relacionadas con las respuestas de las evaluaciones.
 */

/**
 * @swagger
 * /answers:
 *   post:
 *     tags: [Answers]
 *     summary: Crear una nueva respuesta
 *     description: Crea una nueva respuesta para una evaluación. Requiere autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: La pregunta a la que se responde.
 *               response:
 *                 type: string
 *                 description: La respuesta a la pregunta.
 *             required:
 *               - question
 *               - response
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la respuesta creada.
 *                 question:
 *                   type: string
 *                   description: La pregunta a la que se respondió.
 *                 response:
 *                   type: string
 *                   description: La respuesta proporcionada.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/', [
        check('question').trim().escape(),
        check('response').trim().escape()
    ],
    authMiddleware, createAnswer);

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     tags: [Answers]
 *     summary: Obtener una respuesta por ID
 *     description: Recupera una respuesta existente por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la respuesta que se desea recuperar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la respuesta.
 *                 question:
 *                   type: string
 *                   description: La pregunta a la que se respondió.
 *                 response:
 *                   type: string
 *                   description: La respuesta proporcionada.
 *       404:
 *         description: Respuesta no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/:id', authMiddleware, getAnswerById);

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     tags: [Answers]
 *     summary: Actualizar una respuesta por ID
 *     description: Actualiza una respuesta existente por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la respuesta que se desea actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: La nueva pregunta para actualizar.
 *               response:
 *                 type: string
 *                 description: La nueva respuesta para actualizar.
 *             required:
 *               - question
 *               - response
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la respuesta actualizada.
 *                 question:
 *                   type: string
 *                   description: La pregunta actualizada.
 *                 response:
 *                   type: string
 *                   description: La respuesta actualizada.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       404:
 *         description: Respuesta no encontrada.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.put('/:id', [
        check('question').trim().escape(),
        check('response').trim().escape()
    ],
    authMiddleware, updateAnswer);

module.exports = router;
