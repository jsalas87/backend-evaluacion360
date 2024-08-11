const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/AuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones relacionadas con la autenticación de usuarios.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema. Requiere un email válido, una contraseña con al menos 3 caracteres y un nombre de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del nuevo usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del nuevo usuario.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del nuevo usuario.
 *             required:
 *               - email
 *               - password
 *               - username
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 */
router.post('/register', 
    [
        check('email').isEmail().withMessage('Email must be a valid format'),
        check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
        check('username').trim().escape()
    ],
    registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión de un usuario
 *     description: Inicia sesión de un usuario existente con un email válido y una contraseña correcta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación.
 *       400:
 *         description: Solicitud inválida, los datos proporcionados no cumplen con los requisitos.
 *       401:
 *         description: Credenciales inválidas, email o contraseña incorrectos.
 */
router.post('/login',
    [
        check('email').isEmail().withMessage('Email must be a valid format'),
        check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
    ],
    loginUser);

module.exports = router;
