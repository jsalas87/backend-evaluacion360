const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const reportController = require('../controllers/ReportController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Operaciones relacionadas con los reportes.
 */

/**
 * @swagger
 * /reports/evaluation/employee/{id}:
 *   get:
 *     tags: [Reports]
 *     summary: Obtener evaluación de un empleado por ID
 *     description: Recupera un reporte de evaluación para un empleado especificado por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado para obtener su reporte de evaluación.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte de evaluación del empleado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del empleado.
 *                 evaluation:
 *                   type: object
 *                   description: Detalles de la evaluación del empleado.
 *                   properties:
 *                     period:
 *                       type: string
 *                       description: Período de la evaluación.
 *                     type:
 *                       type: string
 *                       description: Tipo de evaluación.
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           questionId:
 *                             type: string
 *                             description: ID de la pregunta.
 *                           response:
 *                             type: string
 *                             description: Respuesta del empleado.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       404:
 *         description: Reporte de evaluación no encontrado para el ID especificado.
 */
router.get('/evaluation/employee/:id', authMiddleware, reportController.getEvaluationEmployeeByIdEmp);

module.exports = router;
