const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/employees', require('./src/routes/employee'));
app.use('/api/evaluations', require('./src/routes/evaluation'));
app.use('/api/questions', require('./src/routes/question'));
app.use('/api/answers', require('./src/routes/answer'));
app.use('/api/evaluationsemp', require('./src/routes/evaluationEmployee'));
app.use('/api/report', require('./src/routes/report'));
const swaggerConfig = require('./src/config/swagger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const errorHandler = require('./src/middlewares/ErrorHandler');

app.use(errorHandler);
swaggerConfig(app);
