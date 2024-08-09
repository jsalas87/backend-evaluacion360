const Employee = require('../models/Employee');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        next(err)
    }
};

exports.createEmployee = async (req, res, next) => {
    const { name, position, department, manager } = req.body;

    try {
        const newEmployee = new Employee({ name, position, department, manager });
        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        next(err)
    }
}

exports.getEmployeeById = async (req, res, next) => {

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) throw new NotFoundRequestError('Employee not found');
        res.json(employee);
      } catch (err) {
        next(err)
      }

}

exports.updateEmployee = async (req, res, next) => {

    const { name, position, department, manager } = req.body;

    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) throw new NotFoundRequestError('Employee not found');

        employee.name = name || employee.name;
        employee.position = position || employee.position;
        employee.department = department || employee.department;
        employee.manager = manager || employee.manager;

        await employee.save();
        res.json(employee);
    } catch (err) {
        next(err)
    }
}