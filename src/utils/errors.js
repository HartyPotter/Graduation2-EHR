class BaseError extends Error {
  constructor(message, statusCode = 500, details = null, errorType = 'BaseError') {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.errorType = errorType;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends BaseError {
  constructor(resource, id = null, details = null) {
    const message = id 
      ? `Resource Not Found: ${resource} with ID ${id} does not exist`
      : `Resource Not Found: ${resource} does not exist`;
    super(message, 404, details, 'NotFoundError');
  }
}

class ValidationError extends BaseError {
  constructor(message, details = null) {
    const formattedMessage = `Schema Validation Error: ${message}`;
    super(formattedMessage, 400, details, 'SchemaValidationError');
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Authentication required to access this resource', details = null) {
    super(message, 401, details, 'UnauthorizedError');
  }
}

class ForbiddenError extends BaseError {
  constructor(message = 'You do not have permission to access this resource', details = null) {
    super(message, 403, details, 'ForbiddenError');
  }
}

class ConflictError extends BaseError {
  constructor(resource, field, value, details = null) {
    const message = `Resource Conflict: ${resource} with ${field} "${value}" already exists`;
    super(message, 409, details, 'ConflictError');
  }
}

export {
  BaseError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError
};
