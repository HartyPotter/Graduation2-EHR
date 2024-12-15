import * as utils from '../../../utils/utils-index.js';
import { Patient } from '../../../models/models-index.js'
import * as validate from '../../validators/user-validator.js';
import bcrypt from "bcrypt";

export default async (req, res) => {
    try {
        // Validate that user provided the current passsword
        const { error } = validate.changePassword(req.body);
        if (error) throw new utils.ValidationError(error.details[0].message);
    
        // Destrucutre the request body
        const { currPassword, newPassword, retypeNewPassword } = req.body;
    
        // Check if user is found and fetch his password
        let user = await Patient.findOne({where: { id: req.user.id }});
        user = user.toJSON();

        if (!user) throw new utils.NotFoundError('No user with this email was found.');
    
        // generate token to add to a link to reset the password
        const match = await bcrypt.compare(currPassword, user.password);
        if (!match) throw new utils.ForbiddenError("Passwords don't match");

        if (newPassword !== retypeNewPassword) throw new ValidationError("New password doesn't match");
    
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user
        await Patient.update({ password: newHashedPassword }, { where: { id: req.user.id } });
    
        // Send success email to user
        await utils.sendPasswordChangeEmail(user.email, user.full_name);

        // Send success response
        return utils.sendSuccess(res, 'Password changed successfully!');
    } catch (error) {
        console.error('Error in change-password controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /user/change-password:
 *   post:
 *     summary: Change user's password
 *     description: Allows a user to change their password by providing the current password and a matching new password.
 *     tags:
 *       - User EDIT
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
 *                 example: "currentPassword123!"
 *                 description: The user's current password.
 *               newPassword:
 *                 type: string
 *                 example: "newSecurePassword456!"
 *                 description: The new password the user wishes to set.
 *               retypeNewPassword:
 *                 type: string
 *                 example: "newSecurePassword456!"
 *                 description: Retyped password to confirm matching.
 *     responses:
 *       200:
 *         description: Password changed successfully.
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
 *                   example: Password changed successfully!
 *       400:
 *         description: Validation error for missing or non-matching fields.
 *       403:
 *         description: Current password does not match.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
