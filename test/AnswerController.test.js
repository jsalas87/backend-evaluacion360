const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Answer} = require('../src/models/Answer');
const Question = require('../src/models/Question');
const NotFoundRequestError = require('../src/middlewares/NotFoundRequestError');
const { createAnswer, getAnswerById, updateAnswer } = require('../src/controllers/AnswerController');

// Configura una aplicación Express para las pruebas
const app = express();
app.use(express.json());

app.post('/answers', createAnswer);
app.get('/answers/:id', getAnswerById);
app.put('/answers/:id', updateAnswer);

// Configura una conexión a MongoDB en memoria para las pruebas
const mongoMemoryServer = require('mongodb-memory-server');
const MongoMemoryServer = mongoMemoryServer.MongoMemoryServer;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Answer Controller', () => {

    let answerId;

    it('should create a new answer', async () => {
        const res = await request(app)
            .post('/answers')
            .send({ question: new ObjectId('66b51294e386869b3a927da4'), response: 'Excelente' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.question).toBe('66b51294e386869b3a927da4');
        expect(res.body.response).toBe('Excelente');

        answerId = res.body._id;
    });

    it('should get an answer by ID', async () => {
        const res = await request(app).get(`/answers/${answerId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', answerId);
        expect(res.body.response).toBe('Excelente');
    });

    it('should return 404 for a non-existent answer', async () => {
        const res = await request(app).get('/answers/66b51294e386869b3a927da5');

        expect(res.status).toBe(404);
    });

    it('should update an existing answer', async () => {
        const res = await request(app)
            .put(`/answers/${answerId}`)
            .send({ response: '5' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', answerId);
        expect(res.body.response).toBe('5');
    });

    it('should handle update with missing answer', async () => {
        const res = await request(app)
            .put('/answers/123456789012345678901234')
            .send({ response: '6' });

        expect(res.status).toBe(404);
    });
});

