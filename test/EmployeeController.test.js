const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../src/models/Employee');
const User = require('../src/models/User');
const authMiddleware = require('../src/middlewares/AuthMiddleware');
const employeeController = require('../src/controllers/EmployeeController');
const { registerUser, loginUser } = require('../src/controllers/AuthController');

const app = express();
app.use(express.json());

app.post('/register', registerUser);
app.get('/employees/:id', employeeController.getEmployeeById);

const mongoMemoryServer = require('mongodb-memory-server');
const MongoMemoryServer = mongoMemoryServer.MongoMemoryServer;
let mongoServer;

// Configura un empleado de prueba
let employeeId;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Crear un empleado de prueba
    const newEmployee = new Employee({
        name: 'John Doe',
        position: 'Developer',
        department: 'Engineering',
        manager: '66b506896c1ef53c4bcf091b'
    });
    const employee = await newEmployee.save();
    employeeId = employee._id.toString();

    const authResponse = await request(app)
        .post('/register')
        .send({
            username : "jsalas",
            email : "jsalas@gmail.com", 
            password : 123, 
            role : "admin"
        });

    token = authResponse.body.token;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Employee Controller - Get Employee By ID', () => {

    it('should return employee details for a valid ID', async () => {
        const res = await request(app)
            .get(`/employees/${employeeId}`)
            .set('x-auth-token', `${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', employeeId);
        expect(res.body).toHaveProperty('name', 'John Doe');
        expect(res.body).toHaveProperty('position', 'Developer');
        expect(res.body).toHaveProperty('department', 'Engineering');
        expect(res.body).toHaveProperty('manager', '66b506896c1ef53c4bcf091b');
    });

    it('should return 404 for a non-existent employee', async () => {
        const res = await request(app)
            .get('/employees/123456789012345678901234')
            .set('x-auth-token', `${token}`);

        expect(res.status).toBe(404);
    });

    /*it('should return 401 for unauthorized access', async () => {
        const res = await request(app)
            .get(`/employees/${employeeId}`);

        expect(res.status).toBe(401);
    });
    */
});
