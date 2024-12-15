import * as utils from '../../../utils/utils-index.js';
import { Doctor } from '../../../models/models-index.js'

export default async (req, res) => {
    try {        
        // Check if user exist
        const user = await Doctor.findOne({ where: { id: req.user.id } });
        if (!user) throw new utils.NotFoundError("User not found");

        // Remove user from database
        await Doctor.destroy({ where: { id: req.user.id } });

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
 * /user/delete-user:
 *   delete:
 *     summary: Delete user account
 *     description: Deletes the authenticated user's account, removes associated tokens, and clears session data from Redis.
 *     tags:
 *       - User EDIT
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully!"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
