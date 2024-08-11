const Employee = require('../models/Employee');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.getAllEmployees = async () => {
    return await Employee.find();
};

exports.createEmployee = async ({ name, position, department, manager }) => {
    const newEmployee = new Employee({ name, position, department, manager });
    return await newEmployee.save();
};

exports.getEmployeeById = async (id) => {
    const employee = await Employee.findById(id);
    if (!employee) throw new NotFoundRequestError('Employee not found');
    return employee;
};

exports.updateEmployee = async (id, { name, position, department, manager }) => {
    let employee = await Employee.findById(id);
    if (!employee) throw new NotFoundRequestError('Employee not found');

    employee.name = name || employee.name;
    employee.position = position || employee.position;
    employee.department = department || employee.department;
    employee.manager = manager || employee.manager;

    return await employee.save();
};
