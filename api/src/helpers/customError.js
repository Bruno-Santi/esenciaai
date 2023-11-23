class CustomError extends Error {
  constructor(type, status, payload) {
    super();
    this.type = type;
    this.status = status;
    this.payload = payload;
    Error.captureStackTrace(this, this.constructor);
  }
}


function throwError(type, status, payload) {
  throw new CustomError(type, status, payload);
}

module.exports = throwError;
