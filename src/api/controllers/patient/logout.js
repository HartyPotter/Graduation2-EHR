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
          where: { user_id: req.user.id}
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
 * /patient/logout:
 *   post:
 *     summary: Patient Logout
 *     description: Ends the patient's session by invalidating tokens and clearing session data.
 *     tags:
 *       - Patient
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out the patient.
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
 *                   example: "Logout successful"
 *       401:
 *         description: Unauthorized. Missing or invalid access token.
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
 *                   example: "Access token is missing or invalid."
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
