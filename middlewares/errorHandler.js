async function forwardError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

async function throwErrorOnInvalidRoute(req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { forwardError, throwErrorOnInvalidRoute, AppError };
