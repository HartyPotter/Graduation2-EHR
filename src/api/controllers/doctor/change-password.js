import * as utils from '../../../utils/utils-index.js';
import { Doctor } from '../../../models/models-index.js'
import * as validate from '../../validators/user-validator.js';
import bcrypt from "bcrypt";

export default async (req, res) => {
    try {
        const userId = req.auth.payload.sub; // Extract user ID from the token
        const email = req.auth.payload.email; // Extract email from the token

        // Validate input
        if (!email) {
        throw new utils.ValidationError('Email is required');
        }

        const ticket = await auth0Management.tickets.changePassword({
            user_id: userId, // Auth0 user ID
            email, // User's email address
            // new_password: newPassword, // Optional: Pre-fill the new password in the form
            // connection_id: 'con_xxxxxxxxxxxx', // Optional: Specify the connection ID
          });
        // Optionally, invalidate the user's existing sessions or tokens
        await auth0Management.users.deleteAllAuthenticators({ id: userId });

        // Send success response
        return utils.sendSuccess(res, 'Password change ticket generated successfully!', {
            ticketUrl: ticket.ticket,
          });
    } catch (error) {
        console.error('Error in change-password controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /doctor/change-password:
 *   post:
 *     summary: Change doctor's password
 *     description: Allows a doctor to change their password by providing the current password and a matching new password.
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currPassword:
 *                 type: string
 *                 description: The doctor's current password.
 *                 example: "currentPassword123!"
 *               newPassword:
 *                 type: string
 *                 description: The new password the doctor wishes to set.
 *                 example: "newSecurePassword456!"
 *               retypeNewPassword:
 *                 type: string
 *                 description: Retyped new password to confirm matching.
 *                 example: "newSecurePassword456!"
 *             required:
 *               - currPassword
 *               - newPassword
 *               - retypeNewPassword # Explicitly list required fields
 *     responses:
 *       '200':
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example: {
 *               "status": "success",
 *               "message": "Password changed successfully!"
 *             }
 *       '400':
 *         description: Validation error for missing or non-matching fields.
 *         content:
 *           application/json:
 *             example: {
 *               "status": "error",
 *               "message": "New passwords don't match"
 *             }
 *       '403':
 *         content:
 *           application/json:
 *             example: {
 *               "status": "error",
 *               "message": "Incorrect current password"
 *             }
 *       '404':
 *         content:
 *           application/json:
 *             example: {
 *               "status": "error",
 *               "message": "No user with this email was found."
 *             }
 *       '500':
 *         content:
 *           application/json:
 *             example: {
 *               "status": "error",
 *               "message": "Incorrect current password"
 *             }
 */