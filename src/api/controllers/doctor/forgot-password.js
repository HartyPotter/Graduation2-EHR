import * as utils from '../../../utils/utils-index.js';
import { Doctor } from '../../../models/models-index.js'
import * as validate from '../../validators/user-validator.js';


export default async (req, res) => {
    try {
        // Validate that user provided the his email
        const { error } = validate.forgotPassword(req.body);
        if (error) throw new utils.ValidationError('Email not provided.');
    
        // Destrucutre the request body
        const { email } = req.body;
    
        // find user with his email
        const user = await Doctor.findOne({where: { email }});
    
        if (!user) throw new utils.NotFoundError('No user with this email was found.');
    
        // generate token to add to a link to reset the password
        const resetToken = await utils.signResetToken(email);
    
        // generate reset link to be sent to the user
        const resetLink = `http://localhost:3000/api/doctor/reset-password?token=${resetToken}`;
    
        // Send email with the link to the user
        utils.sendResetPasswordEmail(email, user.full_name, resetLink);

        // Send success response
        return utils.sendSuccess(res, 'Reset link was sent successfully!');
    } catch (error) {
        console.error('Error in forgot-password controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /doctor/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     description: Generates a reset token and sends an email to the user with a link to reset their password.
 *     tags:
 *       - Doctor
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
 *                 example: "johndoe@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Reset link was sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Reset link was sent successfully!"
 *       400:
 *         description: Validation error (e.g., email not provided).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Validation error: email not provided."
 *       404:
 *         description: User with the provided email was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No user with this email was found."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */