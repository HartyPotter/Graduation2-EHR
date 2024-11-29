import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { redisClient  } from '../loaders/redis-loader.js';
import { User } from '../models/models-index.js';
import { jwtSecretKey, refreshTokenSecretKey } from './config.js';
import * as utils from '../utils/utils-index.js';

// Access Token Strategy
passport.use(
  'access-token',
  new JwtStrategy(
    {
      secretOrKey: jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    },
    async (payload, done) => {
      try {
        console.log(payload);

        // Check token expiration
        if (Date.now() > payload.exp * 1000) return done(new utils.UnauthorizedError({ message: "Token Expired", expired: true }));

        // Find user in db
        const user = await User.findByPk(payload.id);
        
        // If found, return user to callback 
        if (!user) return done(new utils.NotFoundError("User not found"));

        // Else, throw not found error
        return done(null, user);
      } catch (error) {
        return done(new utils.InternalServerError(error.message));
      }
    }
  )
);

// Refresh Token Strategy
passport.use(
  'refresh-token',
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, refreshTokenSecretKey);
      const storedToken = await redisClient.get(payload.id);
      if (storedToken === token) {
        const user = await User.findByPk(payload.id);
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
