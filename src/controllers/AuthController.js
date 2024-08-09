const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const BadRequestError = require('../middlewares/BadRequestError');

// Registro de usuario
exports.registerUser = async (req, res, next) => {

  try {

    const errors = validationResult(req);
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    if (!errors.isEmpty()) {
      throw new BadRequestError(errorMessages);
    }
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) throw new BadRequestError('User already exists');

    user = new User({ username, email, password, role });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    next(err)
  }
};

// Login de usuario
exports.loginUser = async (req, res, next) => {

  try {

    const errors = validationResult(req);
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    if (!errors.isEmpty()) {
      throw new BadRequestError(errorMessages);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestError('Invalid credentials');

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    next(err)
  }
};
