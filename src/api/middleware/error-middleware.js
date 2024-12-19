import { BaseError, ValidationError } from '../../utils/errors.js';

export const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  // Convert Mongoose validation errors to custom ValidationError
  if (err.name === 'ValidationError' && err.errors) {
    const details = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
    
    err = new ValidationError('Database Validation Error: Invalid or missing required fields', details);
    err.errorType = 'MongooseValidationError';
  }

  // Handle duplicate key errors in mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[field];
    
    return res.status(409).json({
      status: 'error',
      errorType: 'DuplicateKeyError',
      message: `Database Conflict Error: Record with ${field} "${value}" already exists`,
      details: {
        field,
        value,
        constraint: 'unique'
      }
    });
  }

  // Handle all custom errors
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: 'error',
      errorType: err.errorType,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Handle any unexpected errors
  return res.status(500).json({
    status: 'error',
    errorType: 'InternalServerError',
    message: 'An unexpected error occurred while processing your request',
    ...(process.env.NODE_ENV === 'development' && {
      details: {
        message: err.message,
        stack: err.stack
      }
    })
  });
};
