import { Token } from '../../../models/models-index.js';
import * as utils from '../../../utils/utils-index.js'; 

export default async (req, res) => {
  try {
    await Token.update(
        { 
          valid: false, 
          expiresIn: Date.now() 
        },
        {
          where: { user_id: req.user.id }
        }
      );

    // Revoke Token from Redis
    await utils.revokeUserRedisLogin(req.user.id);

    // Send successful response
    return utils.sendSuccess(res, 'Logout successful');

  } catch (error) {
    console.error('Error in logout controller:', error);
    return utils.sendError(res, error);
  }
};

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User logout
 *     description: Logs the user out by invalidating the refresh token and removing session data from Redis.
 *     tags:
 *       - User AUTH
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
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
 *                   example: "Logout successful"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Server error.
 */
