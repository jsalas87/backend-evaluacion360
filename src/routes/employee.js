const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const employeeController = require('../controllers/EmployeeController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Operaciones relacionadas con los empleados.
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener todos los empleados
 *     description: Recupera una lista de todos los empleados. Requiere autenticación.
 *     responses:
 *       200:
 *         description: Lista de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del empleado.
 *                   name:
 *                     type: string
 *                     description: Nombre del empleado.
 *                   position:
 *                     type: string
 *                     description: Cargo del empleado.
 *                   department:
 *                     type: string
 *                     description: Departamento del empleado.
 *                   manager:
 *                     type: string
 *                     description: Nombre del gerente del empleado.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/', authMiddleware, employeeController.getAllEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener un empleado por ID
 *     description: Recupera los detalles de un empleado específico por su ID. Requiere autenticación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del empleado a recuperar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del empleado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del empleado.
 *                 name:
 *                   type: string
 *                   description: Nombre del empleado.
 *                 position:
 *                   type: string
 *                   description: Cargo del empleado.
 *                 department:
 *                   type: string
 *                   description: Departamento del empleado.
 *                 manager:
 *                   type: string
 *                   description: Nombre del gerente del empleado.
 *       404:
 *         description: Empleado no encontrado.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

/**
 * @swagger
 * /employees:
 *   post:
 *     tags: [Employees]
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado en el sistema. Requiere autenticación y validación de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del empleado.
 *               position:
 *                 type: string
 *                 description: Cargo del empleado.
 *               department:
 *                 type: string
 *                 description: Departamento del empleado.
 *               manager:
 *                 type: string
 *                 description: Nombre del gerente del empleado.
 *             required:
 *               - name
 *               - position
 *               - department
 *               - manager
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del nuevo empleado.
 *                 name:
 *                   type: string
 *                   description: Nombre del empleado.
 *                 position:
 *                   type: string
 *                   description: Cargo del empleado.
 *                 department:
 *                   type: string
 *                   description: Departamento del empleado.
 *                 manager:
 *                   type: string
 *                   description: Nombre del gerente del empleado.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.post('/', authMiddleware, 
    [
        check('name').trim().escape(),
        check('position').trim().escape(),
        check('department').trim().escape(),
        check('manager').trim().escape()
    ],
    employeeController.createEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags: [Employees]
 *     summary: Actualizar un empleado por ID
 *     description: Actualiza los detalles de un empleado existente por su ID. Requiere autenticación y validación de datos.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del empleado a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del empleado.
 *               position:
 *                 type: string
 *                 description: Cargo del empleado.
 *               department:
 *                 type: string
 *                 description: Departamento del empleado.
 *               manager:
 *                 type: string
 *                 description: Nombre del gerente del empleado.
 *             required:
 *               - name
 *               - position
 *               - department
 *               - manager
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del empleado actualizado.
 *                 name:
 *                   type: string
 *                   description: Nombre del empleado.
 *                 position:
 *                   type: string
 *                   description: Cargo del empleado.
 *                 department:
 *                   type: string
 *                   description: Departamento del empleado.
 *                 manager:
 *                   type: string
 *                   description: Nombre del gerente del empleado.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       404:
 *         description: Empleado no encontrado.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 */
router.put('/:id', authMiddleware,
    [
        check('name').trim().escape(),
        check('position').trim().escape(),
        check('department').trim().escape(),
        check('manager').trim().escape()
    ],
    employeeController.updateEmployee);

module.exports = router;


