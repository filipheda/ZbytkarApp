const { CustomAPIError } = require('../utils/errors.js');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Došlo k neočekávané chybě na serveru'
  });
};

module.exports = errorHandler;
