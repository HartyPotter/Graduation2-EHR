import * as utils from '../../utils/utils-index.js';

/**
 * Middleware to enforce role-based access control (RBAC).
 * @param {string} requiredRole - The role required to access the resource.
 */
export const authorizeUser = (requiredRole) => (req, res, next) => {
  try {
    // Extract the user's role from the token payload
    const { role } = req.auth.payload;

    // Check if the user has the required role
    if (role !== requiredRole) {
      throw new utils.ForbiddenError('Forbidden: Insufficient permissions');
    }

    // If authorized, proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return utils.sendError(res, error);
  }
};
