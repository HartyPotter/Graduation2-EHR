import * as utils from '../../utils/utils-index.js';

// eslint-disable-next-line consistent-return
export const CheckPermission = requiredPermission => (req, res, next) => {
  try {
    const { permissions } = req.auth.payload;
    if (!permissions || !permissions.includes(requiredPermission)) {
      throw new utils.ForbiddenError('Forbidden: Insufficient permissions');
    }
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Permission check error:', error);
    return utils.sendError(res, error);
  }
};
