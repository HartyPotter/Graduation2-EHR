export const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => res.status(statusCode).json({
  status: 'success',
  message,
  ...(data && { data }),
});

// Middleware to handle async errors
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
