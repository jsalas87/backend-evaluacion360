const express = require('express');
const { check } = require('express-validator');
const { escape } = require('validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createQuestion, listQuestions, updateQuestion } = require('../controllers/QuestionController');

const router = express.Router();

// Crear nueva pregunta
router.post('/', 
    [
        check('text').trim().escape(),
        check('type').trim().escape(),
        check('options').isArray().withMessage('Questions must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ],
    authMiddleware, createQuestion);

// Listar preguntas
/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Listar todas las preguntas
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *       500:
 *         description: Error del servidor
 */
router.get('/', authMiddleware, listQuestions);

// Actualizar pregunta por ID
router.put('/:id',
    [
        check('text').trim().escape(),
        check('type').trim().escape(),
        check('options').isArray().withMessage('Questions must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ], 
    authMiddleware, updateQuestion);

module.exports = router;
