import { auth } from 'express-oauth2-jwt-bearer';
import { auth0_audience, auth0_domain } from '../../config/config.js';

// Auth0 configuration
const authConfig = {
  audience: auth0_audience,
  issuerBaseURL: `https://${auth0_domain}/`, // Your Auth0 domain
};

// Middleware to extract token from cookies
const extractTokenFromCookie = (req, res, next) => {
  const token = req.cookies.accessToken; // Replace 'accessToken' with the name of your cookie
  if (token) {
    req.headers.authorization = `Bearer ${token}`; // Attach the token to the Authorization header
  }
  next(); // Pass control to the next middleware
};

// Auth0 middleware to validate JWTs
const checkJwt = auth(authConfig);

// Combined middleware to extract token and validate JWT
export const authAccessToken = [extractTokenFromCookie, checkJwt];