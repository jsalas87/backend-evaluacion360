class UnauthorizedRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedRequestError';
      this.statusCode = 401;
    }
}

module.exports = UnauthorizedRequestError