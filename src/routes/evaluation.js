const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createEvaluation, listEvaluations, getEvaluationById, updateEvaluation } = require('../controllers/EvaluationController');

const router = express.Router();

// Crear nueva evaluación
router.post('/', authMiddleware, createEvaluation);

// Listar evaluaciones
router.get('/', authMiddleware, listEvaluations);

// Obtener detalles de una evaluación por ID
router.get('/:id', authMiddleware, getEvaluationById);

// Actualizar evaluación por ID
router.put('/:id', authMiddleware, updateEvaluation);

module.exports = router;

