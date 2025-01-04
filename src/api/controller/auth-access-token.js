import passport from '../../../config/passport-config.js';
import * as utils from '../../utils/utils-index.js';
import { redisClient } from '../../loaders/redis-loader.js';

export const authAccessToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return utils.sendError(res, new utils.UnauthorizedError('Access token missing'));
    }

    // Proceed with Passport authentication if token exists in Redis
    passport.authenticate('access-token', { session: false }, async (err, user) => {
      // console.log(user);
      if (err) return next(err);

      // Handle invalid token case
      if (!user) return next(new utils.UnauthorizedError("Invalid access token"));

      // Remove user password from response
      req.user = user;
      next();
    })(req, res, next);
};
