import * as utils from '../../utils/utils-index.js';

export const CheckPermission = (requiredPermission) => (req, res, next) => {
  try {
    const { permissions } = req.auth.payload;
    if (!permissions || !permissions.includes(requiredPermission)) {
      throw new utils.ForbiddenError('Forbidden: Insufficient permissions');
    }
    next();
  } catch (error) {
    console.error('Permission check error:', error);
      return utils.sendError(res, error);
  }
};
