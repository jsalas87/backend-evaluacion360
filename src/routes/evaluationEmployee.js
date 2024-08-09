const express = require('express');
const { check } = require('express-validator');
const { escape } = require('validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const evaluationEmployeeController = require('../controllers/EvaluationEmployeeController');

const router = express.Router();

router.post('/', 
    [
        check('employee').trim().escape(),
        check('evaluation').trim().escape(),
        check('questions').isArray().withMessage('Questions must be an array')
        .customSanitizer(value => value.map(q => escape(q.trim())))
    ],
    authMiddleware, evaluationEmployeeController.createEvaluationemployee);

router.post('/:id/submit', authMiddleware, evaluationEmployeeController.completeEvaluationEmployee);

router.get('/:id', authMiddleware, evaluationEmployeeController.getEvaluationemployeeById);

router.post('/:id/respond', 
    [
        check('employee').trim().escape(),
        check('evaluation').trim().escape()
    ],
    authMiddleware, evaluationEmployeeController.respondEvaluationEmployee);

module.exports = router;