const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createQuestion, listQuestions, updateQuestion } = require('../controllers/QuestionController');

const router = express.Router();

// Crear nueva pregunta
router.post('/', authMiddleware, createQuestion);

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
router.put('/:id', authMiddleware, updateQuestion);

module.exports = router;
