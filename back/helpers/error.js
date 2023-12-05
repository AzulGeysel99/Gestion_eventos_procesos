const { STATUS_CODES } = require('./constants.js');
const { sendResponse } = require('./utils.js');

class AppError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.response = error || {};

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (error, req, res) => {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  delete error?.statusCode;

  sendResponse(
    res,
    statusCode,
    error.message || 'Error interno del servidor',
    [],
    error
  );
};

module.exports = { AppError, handleError };