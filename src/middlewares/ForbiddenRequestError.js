class ForbiddenRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ForbiddenRequestError';
      this.statusCode = 403;
    }
}

module.exports = ForbiddenRequestError