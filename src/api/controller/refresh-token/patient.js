import { Token, Patient } from '../../../models/models-index.js';
import * as utils from '../../../utils/utils-index.js';
import * as validate from '../../validators/user-validator.js';

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

    if (!isValid) throw new utils.UnauthorizedError("Invalid refresh token, need to login again");
    
    // Fetch user
    const user = await Patient.findByPk(id);

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
      refresh_token: refreshToken,
      valid: true,
      expires_in: new Date(Date.now() + 4 * 604800000), // 7 days
      created_at: new Date(),
      created_by_ip: userIp, // Add the IP address here
    });

    // Add user info and refresh token to Redis for faster access
    await redisClient.hSet(`user:${userData.id}`, "user", JSON.stringify(userData), "refreshToken", refreshToken);
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
 * /patient/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Generates a new access token using a valid refresh token.
 *     tags:
 *       - Patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: The refresh token used to generate a new access token.
 *     responses:
 *       200:
 *         description: Successfully refreshed the access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
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
 *                           type: string
 *                           example: "PT1234"
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
 *                         phone_number:
 *                           type: string
 *                           example: "1234567890"
 *                         insurance_number:
 *                           type: string
 *                           example: "INS123456"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid or expired refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "The provided refresh token is invalid or has expired."
 *       401:
 *         description: Unauthorized. Authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Authentication failed. Please provide a valid token."
 *       404:
 *         description: Patient not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Patient not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */
