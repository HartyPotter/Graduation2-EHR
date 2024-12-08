import { redisClient } from '../../../loaders/redis-loader.js';
import { User } from '../../../models/models-index.js';
import * as utils from '../../../utils/utils-index.js';
import { jwtSecretKey } from '../../../config/config.js';
import jwt from 'jsonwebtoken';

export default async(req, res) => {
    try {
        // Extract email from request
        const { email } = req.body;

        // check if user registered but not verified
        const user = await User.findOne({where: { email , is_verified: false}});

        if (!user) throw new utils.NotFoundError('User not found or already verified, make sure you register first.');
        
        // Search redis for tokens in redis
        await redisClient.get(`confirmCode:${email}`);

        // Generate new code and token
        const newConfirmCode = utils.generateRandomCode(4);
        const newConfirmToken = await utils.signConfirmCodeToken(jwtSecretKey, email, newConfirmCode);

        // Update redis with the newly generated code
        const result = await redisClient.set(`confirmCode:${email}`, newConfirmToken, { 'EX': 300 });

        // // Check if an error happened during redis update
        // if (result !== "OK") throw new utils.InternalServerError("Couldn't generate ");

        // Send new verification email
        await utils.sendVerificationEmail(email, user.full_name, newConfirmCode, 'register');

        return utils.sendSuccess(res, 'New confirmation code was sent to you, check your mail.', { confirmToken: newConfirmToken });
    } catch (error) { 
        console.error('Error in resend-email controller:', error);
        return utils.sendError(res, error);
    }
}

/**
 * @swagger
 * /user/resend-email:
 *   post:
 *     summary: Resend email verification code
 *     description: Resends a new confirmation code to a user’s email if they registered but have not yet verified their account.
 *     tags:
 *       - User AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email of the user requesting the resend of the confirmation code.
 *     responses:
 *       200:
 *         description: New confirmation code sent successfully to the user's email.
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
 *                   example: New confirmation code was sent to you, check your mail.
 *                 data:
 *                   type: object
 *                   properties:
 *                     confirmToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: User not found or already verified.
 *       500:
 *         description: Server error.
 */
