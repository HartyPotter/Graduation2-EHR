import { auth } from 'express-oauth2-jwt-bearer';
import { auth0_audience, auth0_domain } from '../../config/config.js';

// Middleware to validate JWTs issued by Auth0
const authConfig = {
  audience: auth0_audience,
  issuerBaseURL: `https://${auth0_domain}/`, // Your Auth0 domain
};


export const authAccessToken = auth(authConfig);