const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const evaluationEmployeeController = require('../controllers/EvaluationEmployeeController');

const router = express.Router();

router.post('/', authMiddleware, evaluationEmployeeController.createEvaluationemployee);

router.post('/:id/submit', authMiddleware, evaluationEmployeeController.completeEvaluationEmployee);

router.get('/:id', authMiddleware, evaluationEmployeeController.getEvaluationemployeeById);

router.post('/:id/respond', authMiddleware, evaluationEmployeeController.respondEvaluationEmployee);

module.exports = router;