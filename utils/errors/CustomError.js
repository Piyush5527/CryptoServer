export default class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Maintain proper stack trace for where the error occurred
    Error.captureStackTrace(this, this.constructor);
  }
}


