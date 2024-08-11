const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createAnswer, getAnswerById, updateAnswer } = require('../controllers/AnswerController');

const router = express.Router();

// Crear una nueva respuesta
router.post('/', authMiddleware, createAnswer);

// Obtener una respuesta específica por ID
router.get('/:id', authMiddleware, getAnswerById);

// Actualizar una respuesta por ID
router.put('/:id', authMiddleware, updateAnswer);

module.exports = router;
