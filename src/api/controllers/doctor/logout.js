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
 * /doctor/logout:
 *   post:
 *     summary: Doctor Logout
 *     description: Ends the doctor's session by invalidating tokens and clearing session data.
 *     tags:
 *       - Doctor
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out the doctor.
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
 *         description: Unauthorized. Missing or invalid access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access token is missing or invalid."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */
