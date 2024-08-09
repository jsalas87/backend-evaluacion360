const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const { createEvaluation, listEvaluations, getEvaluationById, updateEvaluation } = require('../controllers/EvaluationController');

const router = express.Router();

// Crear nueva evaluación
router.post('/', 
    [
        check('period').trim().escape(),
        check('type').trim().escape()
    ],
    authMiddleware, createEvaluation);

// Listar evaluaciones
router.get('/', authMiddleware, listEvaluations);

// Obtener detalles de una evaluación por ID
router.get('/:id', authMiddleware, getEvaluationById);

// Actualizar evaluación por ID
router.put('/:id', 
    [
        check('period').trim().escape(),
        check('type').trim().escape()
    ],
    authMiddleware, updateEvaluation);

module.exports = router;

