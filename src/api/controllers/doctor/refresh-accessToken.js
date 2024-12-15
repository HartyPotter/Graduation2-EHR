import { Token, Doctor } from '../../../models/models-index.js';
import * as utils from '../../../utils/utils-index.js';
import * as validate from '../../validators/user-validator.js';
import { redisClient } from '../../../loaders/redis-loader.js';

export default async (req, res) => {
  try {
    // validate the presence of refreshToken in the request body
    const { error } = validate.refreshToken(req.body);
    
    if (error) {
      throw new utils.ValidationError("Refresh token not provided");
    }

    const { refreshToken } = req.body
    
    // Verify the refreshToken
    const { isValid, id } = await utils.verifyRefreshToken(refreshToken);
    console.log("isValid: ", isValid);
    console.log("id: ", id);
    if (!isValid) throw new utils.UnauthorizedError("Invalid refresh token, need to login again");
    
    // Fetch user
    const user = await Doctor.findByPk(id);

    if (!user) throw new utils.NotFoundError("User not found");

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    // Generate new access token and send it back to the client
    const newAccessToken = await utils.signAccessToken(user.id);
    const newRefreshToken = await utils.signRefreshToken(user.id);

    // Get the user's IP address from the request
    const userIp = req.headers['x-forwarded-for'] || req.ip;

    await Token.upsert({
      user_id: userData.id,
      user_type: "doctor",
      refresh_token: newRefreshToken,
      valid: true,
      expires_in: new Date(Date.now() + 4 * 604800000), // 7 days
      created_at: new Date(),
      created_by_ip: userIp, // Add the IP address here
    });

    // Add user info and refresh token to Redis for faster access
    await redisClient.hSet(`user:${userData.id}`, "user", JSON.stringify(userData), "refreshToken", newRefreshToken);
    await redisClient.expire(`user:${userData.id}`, 2592000);
    
    return utils.sendSuccess(res, 'Access token refreshed',
      {
        user: { ...userData },
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    );
  } catch (error) {
    console.error('Error in refresh-token controller:', error);
    return utils.sendError(res, error);
  }
};


/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh user access token
 *     description: Refreshes the access token using a valid refresh token.
 *     tags:
 *       - User AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token provided by the client.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.1FnWsUb3eD36wfnPlpYWlUzf_tg5hr8Ll-ehXg0V5tw"
 *     responses:
 *       200:
 *         description: Successfully refreshed the access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Access token refreshed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "johndoe@example.com"
 *                         full_name:
 *                           type: string
 *                           example: "John Doe"
 *                         address:
 *                           type: string
 *                           example: "123 Main Street, City, Country"
 *                         photo_url:
 *                           type: string
 *                           example: "http://example.com/photo.jpg"
 *                     accessToken:
 *                       type: string
 *                       description: The newly generated access token.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.1FnWsUb3eD36wfnPlpYWlUzf_tg5hr8Ll-ehXg0V5tw"
 *                     refreshToken:
 *                       type: string
 *                       description: The refresh token that can be used to refresh the access token again.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.1FnWsUb3eD36wfnPlpYWlUzf_tg5hr8Ll-ehXg0V5tw"
 *       400:
 *         description: Invalid refresh token.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
