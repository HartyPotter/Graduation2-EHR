import * as utils from '../../../utils/utils-index.js';
import { Patient } from '../../../models/models-index.js'

export default async (req, res) => {
    try {        
        // Check if user exist
        const user = await Patient.findOne({ where: { id: req.user.id } });
        if (!user) throw new utils.NotFoundError("User not found");

        // Remove user from database
        await Patient.destroy({ where: { id: req.user.id } });

        // Remove user's tokens
        await utils.revokeUserRedisLogin(req.user.id);

        // Deletes user from the request
        delete req.user;

        // Send success response
        return utils.sendSuccess(res, 'User deleted successfully!');
    } catch (error) {
        console.error('Error in delete-user controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /patient/delete:
 *   delete:
 *     summary: Delete user account
 *     description: Deletes the authenticated user's account, removes associated tokens, and clears session data from Redis.
 *     tags:
 *       - Patient
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
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
 *                   example: "User deleted successfully!"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
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
 *                   example: "Unauthorized"
 *       404:
 *         description: User not found.
 *         content: # Added content for 404 response
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "User not found"            
 *       500:
 *         description: Internal server error.
 *         content: # Added content for 500 response
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */