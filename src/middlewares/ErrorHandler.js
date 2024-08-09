function errorHandler(err, req, res, next) {
  console.error('Error completo:', err); 
  console.error('La traza:', err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
  