import { jwtSecretKey } from "../../../config/config.js";
import { redisClient } from "../../../loaders/redis-loader.js";
import { Doctor } from "../../../models/models-index.js";
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
        const [rows, [updatedUser]] = await Doctor.update({ is_verified: true }, { where: { email: user.email }, returning: true });

        if (rows == 0) throw new utils.ValidationError("User not updated");
        if (!updatedUser) throw new utils.ValidationError("User not found after update");
        
        const userData = updatedUser.dataValues;
        delete userData.password;

        // Send Welcome email to user
        utils.sendWelcomeEmail(user.email, user.full_name);

        // Send success message
        return utils.sendSuccess(res, "User verified successfully!", userData);
    } catch (error) {
        console.error('Error in verify email controller:', error);
        return utils.sendError(res, error);
    }
};


/**
 * @swagger
 * /doctor/verify-email:
 *   post:
 *     summary: Verify user email
 *     description: Verifies a user's email using a confirmation token sent to their email.
 *     tags:
 *       - Doctor
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
 *                     example: DRC17C02
 *                   email:
 *                     type: string
 *                     example: doctor@example.com
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
 *                   specialization:
 *                     type: string
 *                     example: Cardiology
 *                   license_number:
 *                     type: string
 *                     example: LSC123
 *                   years_of_experience:
 *                     type: integer
 *                     example: 20
 *                   phone_number:
 *                     type: string
 *                     example: +201023456780
 *                   educational_background:
 *                     type: string
 *                     example: Cairo University, Faculty of Medicine
 *                   hospital_affiliations:
 *                     type: string
 *                     example: Dr. Magdy Yaacoub Heart Center in Aswan
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
