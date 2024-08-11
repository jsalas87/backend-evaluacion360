// controllers/EmployeeController.js
const EmployeeService = require('../services/EmployeeService');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

exports.createEmployee = async (req, res, next) => {
    const { name, position, department, manager } = req.body;

    try {
        const employee = await EmployeeService.createEmployee({ name, position, department, manager });
        res.json(employee);
    } catch (err) {
        next(err);
    }
};

exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id);
        res.json(employee);
    } catch (err) {
        next(err);
    }
};

exports.updateEmployee = async (req, res, next) => {
    const { name, position, department, manager } = req.body;

    try {
        const employee = await EmployeeService.updateEmployee(req.params.id, { name, position, department, manager });
        res.json(employee);
    } catch (err) {
        next(err);
    }
};
