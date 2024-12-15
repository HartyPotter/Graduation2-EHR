import * as utils from '../../../utils/utils-index.js';
import { Patient } from '../../../models/models-index.js'
import bcrypt from 'bcrypt';
import * as validate from '../../validators/user-validator.js';
import { redisClient } from '../../../loaders/redis-loader.js';
import { resetSecretKey } from '../../../config/config.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    try {
        // Validate that user provided the new passsword
        const { error } = validate.forgotPassword(req.body);

        if (error) {
            throw new utils.ValidationError(error.details[0].message);
        }
        
        // Destrucutre the request body
        const { token } = req.query;
        const { newPassword, retypeNewPassword } = req.body;
        
        // Check if the passwords match
        if (newPassword !== retypeNewPassword) throw new utils.ValidationError("Passwords don't match");
        
        // Check the validity of the token and the reset process
        const payload = jwt.verify(token, resetSecretKey);

        const exist = await redisClient.get(`reset:${payload.email}`);

        if (!exist) throw new utils.ForbiddenError("User has not requested a password reset");

        // Update user in database with hashed new password
        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await Patient.update({ password: hashNewPassword }, { where: { email: payload.email }, returning: true });

        // Clear redis from reset token
        await redisClient.del(`reset:${payload.email}`);

        // Send email after successful password reset
        await utils.sendResetSuccessEmail(payload.email, updatedUser.full_name);
        
        return utils.sendSuccess(res, "Password was reset successfully!");
    } catch (error) {
        console.error('Error in reset password controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset user's password
 *     description: Allows a user to reset their password by providing a valid token and matching new passwords.
 *     tags:
 *       - User EDIT
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The password reset token sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newStrongPassword123!"
 *                 description: The new password the user wishes to set.
 *               retypeNewPassword:
 *                 type: string
 *                 example: "newStrongPassword123!"
 *                 description: Retyped password to confirm matching.
 *     responses:
 *       200:
 *         description: Password reset successfully.
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
 *                   example: Password was reset successfully!
 *       400:
 *         description: Validation error for missing or non-matching fields.
 *       403:
 *         description: Reset token is invalid or user has not requested password reset.
 *       500:
 *         description: Server error.
 */
