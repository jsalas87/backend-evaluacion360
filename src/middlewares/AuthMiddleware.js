const jwt = require('jsonwebtoken');
const UnauthorizedRequestError = require('./UnauthorizedRequestError');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return next(new UnauthorizedRequestError('No token, authorization denied'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(new UnauthorizedRequestError('Token is not valid'));
  }
};
