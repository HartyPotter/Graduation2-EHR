import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { redisClient  } from '../loaders/redis-loader.js';
import { Patient, Doctor } from '../models/models-index.js';
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
        let user;
        if (payload.role == 'patient') {
          user = await Patient.findByPk(payload.id);
          user.role = 'patient';
        } else if (payload.role == 'doctor') {
          user = await Doctor.findByPk(payload.id);
          user.role = 'doctor';
        }
        const userData = user.dataValues;
        delete userData.password;
        // If found, return user to callback 
        if (!user) return done(new utils.NotFoundError("User not found"));

        // Else, throw not found error
        return done(null, { userData, role: payload.role });
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
