// test/EvaluationController.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Evaluation = require('../src/models/Evaluation');
const NotFoundRequestError = require('../src/middlewares/NotFoundRequestError');
const { createEvaluation, listEvaluations, getEvaluationById, updateEvaluation } = require('../src/controllers/EvaluationController');

// Configura una aplicación Express para las pruebas
const app = express();
app.use(express.json());

app.post('/evaluations', createEvaluation);
app.get('/evaluations', listEvaluations);
app.get('/evaluations/:id', getEvaluationById);
app.put('/evaluations/:id', updateEvaluation);

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

describe('Evaluation Controller', () => {
    let evaluationId;

    it('should create a new evaluation', async () => {
        const res = await request(app)
            .post('/evaluations')
            .send({ period: 'Q1 2024', type: 'Annual' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.period).toBe('Q1 2024');
        expect(res.body.type).toBe('Annual');

        evaluationId = res.body._id;
    });

    it('should list all evaluations', async () => {
        const res = await request(app).get('/evaluations');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(1); // Debería haber al menos una evaluación si el test anterior se ejecuta correctamente
    });

    it('should get an evaluation by ID', async () => {
        const res = await request(app).get(`/evaluations/${evaluationId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', evaluationId);
        expect(res.body.period).toBe('Q1 2024');
        expect(res.body.type).toBe('Annual');
    });

    it('should return 404 for a non-existent evaluation', async () => {
        const res = await request(app).get('/evaluations/123456789012345678901234');

        expect(res.status).toBe(404);
    });

    it('should update an existing evaluation', async () => {
        const res = await request(app)
            .put(`/evaluations/${evaluationId}`)
            .send({ period: 'Q2 2024', type: 'Quarterly' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', evaluationId);
        expect(res.body.period).toBe('Q2 2024');
        expect(res.body.type).toBe('Quarterly');
    });

    it('should handle update with missing evaluation', async () => {
        const res = await request(app)
            .put('/evaluations/123456789012345678901234')
            .send({ period: 'Q3 2024', type: 'Semi-Annual' });

        expect(res.status).toBe(404);
    });
});
