class AppError extends Error {
  constructor(message, statusCode) {
    // Parent Class
    super(message);

    // Setting up the Vriables
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Exporting
module.exports = AppError;
