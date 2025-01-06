import { auth } from 'express-oauth2-jwt-bearer';
import { auth0_audience, auth0_domain } from '../../config/config.js';

// Middleware to validate JWTs issued by Auth0
export const authAccessToken = auth({
  audience: auth0_audience,
  issuerBaseURL: auth0_domain,
});