class NotFoundRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundRequestError';
      this.statusCode = 404;
    }
}

module.exports = NotFoundRequestError
  