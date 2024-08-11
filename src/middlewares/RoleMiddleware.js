const ForbiddenRequestError = require('./ForbiddenRequestError');
module.exports = function (roles) {
    return function (req, res, next) {
      if (!roles.includes(req.user.role)) {
        return next(new ForbiddenRequestError('Forbidden: permission denied'));
      }
      next();
    };
  };
  