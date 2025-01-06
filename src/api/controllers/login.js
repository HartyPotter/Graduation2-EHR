import { Patient, Doctor, Token } from '../../models/models-index.js';
import * as validate from '../validators/user-validator.js';
import * as utils from '../../utils/utils-index.js'
import { redisClient } from '../../loaders/redis-loader.js';
import { ManagementClient } from 'auth0';
import { auth0_domain, client_id, client_secret, auth0_audience} from '../../config/config.js';
import { AuthenticationClient } from 'auth0';
import { default as sequelize} from '../../loaders/postgres-loader.js';
  
const auth0Authentication = new AuthenticationClient({
    domain: auth0_domain,
    clientId: client_id,
    clientSecret: client_secret,
});


export const login = async (req, res) => {
  let transaction;
  try {

    transaction = await sequelize.transaction(); // Start a new transaction
    // Validate login data
    const { error } = validate[`${req.body.role}Login`](req.body);
    if (error) {
      throw new utils.ValidationError(error.details[0].message);
    }

    const { email, password, role } = req.body;

    // Authenticate with Auth0
    const { data: auth0Response } = await auth0Authentication.oauth.passwordGrant({
      username: email,
      password,
      audience: auth0_audience,
      scope: 'openid profile email',
      connection: 'Username-Password-Authentication', // Add this line
    });

    console.log('Auth0 response:', auth0Response);
    
    // Find user in the database
    const user = role === 'doctor'
      ? await Doctor.findOne({ where: { email } })
      : await Patient.findOne({ where: { email } });
    if (!user) {
      throw new utils.NotFoundError('User not found or not verified');
    }

    // Get the user's IP address
    const userIp = req.headers['x-forwarded-for'] || req.ip;

    // Update or insert the refresh token in the database
  //   await Token.upsert({
  //     user_id: user.id,
  //     id_token: auth0Response.id_token,
  //     user_type: role,
  //     valid: true,
  //     expires_in: new Date(Date.now() + 4 * 604800000), // 7 days
  //     created_at: new Date(),
  //     created_by_ip: userIp,
  //   },
  //   { transaction }
  // );

    await transaction.commit();

    // Cache user info and refresh token in Redis
    await redisClient.hSet(`user:${user.id}`, {
      user: JSON.stringify(user),
      id_token: auth0Response.id_token,
    });

    await redisClient.expire(`user:${user.id}`, 2592000); // 30 days

    // Send successful response
    return utils.sendSuccess(res, 'Login successful', {
      user,
      idToken: auth0Response.id_token,
      accessToken: auth0Response.access_token,
    });

  } catch (error) {
    console.error('Error in login controller:', error);
    await transaction.rollback();
    return utils.sendError(res, error);
  }
};