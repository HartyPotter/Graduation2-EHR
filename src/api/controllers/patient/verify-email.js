import { jwtSecretKey } from "../../../config/config.js";
import { redisClient } from "../../../loaders/redis-loader.js";
import { Patient } from "../../../models/models-index.js";
import * as utils from '../../../utils/utils-index.js';
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    try {
        // Extract confirmation code and token
        const { user, confirmCode, confirmToken } = req.body;
        console.log(confirmCode);
        console.log(confirmToken);
        console.log(user.email);
        // Query redis to see if the token is not expired or the user didn't register
        const token = await redisClient.get(`confirmCode:${user.email}`);

        if (!token) throw new utils.ValidationError("Expired token or user didn't register");

        // Verify the token sent and extract payload
        const payload = jwt.verify(confirmToken, jwtSecretKey);

        // Compare the send code with the one in the token
        if (payload.code != confirmCode) throw new utils.UnauthorizedError("Confirmation code sent didn't match the assigned one");
        
        // Update the user's status
        await Patient.update({ is_verified: true }, { where: { email: user.email } });

        // Updated user status and send it to the client app
        user.is_verified = true;

        // Send Welcome email to user
        utils.sendWelcomeEmail(user.email, user.full_name);

        // Send success message
        return utils.sendSuccess(res, "User verified successfully!", { user});
    } catch (error) {
        console.error('Error in verify email controller:', error);
        return utils.sendError(res, error);
    }
};

/**
 * @swagger
 * /patient/verify-email:
 *   post:
 *     summary: Verify user email
 *     description: Verifies a user's email using a confirmation token sent to their email.
 *     tags:
 *       - Patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: PTC17C02
 *                   email:
 *                     type: string
 *                     example: patient@example.com
 *                   full_name:
 *                     type: string
 *                     example: Mark Greyson
 *                   gender:
 *                     type: string
 *                     example: male
 *                   birth_date:
 *                     type: string
 *                     format: date
 *                     example: 1990-01-01
 *                   address:
 *                     type: string
 *                     example: 123 Main St, Cityville, Country
 *                   national_id:
 *                     type: string
 *                     example: 12345678901234
 *                   photo_url:
 *                     type: string
 *                     example: https://example.com/photo.jpg
 *                   is_verified:
 *                     type: boolean
 *                     example: false
 *                   phone_number:
 *                     type: string
 *                     example: "+20123456789"
 *                 description: The user's data.
 *               confirmCode:
 *                 type: string
 *                 example: 1234
 *                 description: The email verification code sent to the user's email.
 *               confirmToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 description: The email verification token sent to the user.
 *     responses:
 *       200:
 *         description: Email verified successfully.
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
 *                   example: Email verified successfully.
 *       400:
 *         description: Invalid or expired token.
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
 *                   example: Invalid or expired token.
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
