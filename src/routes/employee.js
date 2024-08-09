const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/EmployeeController');

const router = express.Router();

// Obtener todos los empleados
router.get('/', authMiddleware, employeeController.getAllEmployees);

// Obtener un empleado por ID
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

// Crear un nuevo empleado
router.post('/', authMiddleware, employeeController.createEmployee);

// Actualizar un empleado por ID
router.put('/:id', authMiddleware, employeeController.getEmployeeById);

module.exports = router;

