import { ValidationError } from '../../utils/errors.js';

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: ''
      }
    }
  });

  if (error) {
    const details = error.details.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    throw new ValidationError('Validation failed', details);
  }

  next();
};
