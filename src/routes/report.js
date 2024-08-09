const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const reportController = require('../controllers/ReportController');

const router = express.Router();

router.get('/evaluation/employee/:id', authMiddleware, reportController.getEvaluationEmployeeByIdEmp);

module.exports = router;