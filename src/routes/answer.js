const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createAnswer, getAnswerById, updateAnswer } = require('../controllers/AnswerController');

const router = express.Router();

// Crear una nueva respuesta
router.post('/', [
        check('question').trim().escape(),
        check('response').trim().escape()
    ],
    authMiddleware, createAnswer);

// Obtener una respuesta específica por ID
router.get('/:id', authMiddleware, getAnswerById);

// Actualizar una respuesta por ID
router.put('/:id', 
    [
        check('question').trim().escape(),
        check('response').trim().escape()
    ],
    authMiddleware, updateAnswer);

module.exports = router;
