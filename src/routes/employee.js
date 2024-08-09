const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const employeeController = require('../controllers/EmployeeController');

const router = express.Router();

// Obtener todos los empleados
router.get('/', authMiddleware, employeeController.getAllEmployees);

// Obtener un empleado por ID
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

// Crear un nuevo empleado
router.post('/', authMiddleware, 
    [
        check('name').trim().escape(),
        check('position').trim().escape(),
        check('department').trim().escape(),
        check('manager').trim().escape()
    ],
    employeeController.createEmployee);

// Actualizar un empleado por ID
router.put('/:id', authMiddleware,
    [
        check('name').trim().escape(),
        check('position').trim().escape(),
        check('department').trim().escape(),
        check('manager').trim().escape()
    ],
     employeeController.getEmployeeById);

module.exports = router;

