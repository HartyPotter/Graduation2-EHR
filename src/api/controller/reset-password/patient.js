import * as utils from '../../../utils/utils-index.js';
import { Patient } from '../../../models/models-index.js'
import bcrypt from 'bcrypt';
import * as validate from '../../validators/user-validator.js';
import { redisClient } from '../../../loaders/redis-loader.js';
import { resetSecretKey } from '../../../../config/config.js';
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
 * /patient/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Allows a user to reset their password by providing the reset token and the new password.
 *     tags:
 *       - Patient
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schema:
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *                 format: password
 *                 example: NewStrongPassword123
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Password reset successfully.
 *       400:
 *         description: Validation error or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid reset token or password does not meet requirements.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */