const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/AuthController');

const router = express.Router();

// Registro de usuario
router.post('/register', 
    [
        check('email').isEmail().withMessage('Email must be a valid format'),
        check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 of long'),
        check('username').trim().escape()
    ],
    registerUser);

// Login de usuario
router.post('/login',
    [
        check('email').isEmail().withMessage('Email must be a valid format'),
        check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 of long')
    ],
    loginUser);

module.exports = router;
