import _ from 'lodash';
import { ForbiddenError } from '../../utils/errors.js';

export const authorize = ({ roles } = {}) => (req, res, next) => {
  const { user, role } = req;
  let hasAccess;

  if (_.isNil(user) || _.isNil(role)) { throw new Error('Invalid arguments, user should role'); }

  // If roles is present, check on the role passed in JWT
  if (!_.isNil(roles) && _.isArray(roles)) { hasAccess = roles.includes(role); }

  return hasAccess ? next() : next(new ForbiddenError());
};
