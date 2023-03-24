const { errorResponse } = require('../utils/api.utils');

const errorMiddleware = (error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'There was an unexpected error';
  const errorDetails = error.message ? null : error;
  return res.status(errorStatus).json(errorResponse(errorMessage, errorDetails));
};

module.exports = errorMiddleware;
