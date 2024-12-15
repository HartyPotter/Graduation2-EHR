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
 * /user/verify-email:
 *   post:
 *     summary: Verify a user's email with confirmation code
 *     description: Verifies the user's email by checking a confirmation code and updates the user's verification status.
 *     tags:
 *       - User AUTH
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
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: user@example.com
 *                     description: The user's email to verify.
 *               confirmCode:
 *                 type: string
 *                 example: 1234
 *                 description: The confirmation code sent to the user's email.
 *               confirmToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 description: The JWT token associated with the confirmation code.
 *     responses:
 *       200:
 *         description: User's email successfully verified.
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
 *                   example: User verified successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: user@example.com
 *                         full_name:
 *                           type: string
 *                           example: John Doe
 *                         is_verified:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Validation error, such as an expired token or unregistered user.
 *       401:
 *         description: Unauthorized error if the confirmation code doesn't match.
 *       500:
 *         description: Server error.
 */
