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
 * /patient/change-password:
 *   post:
 *     summary: Change patient's password
 *     description: Allows a patient to change their password by providing the current password and a matching new password.
 *     tags:
 *       - Patient
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
 *                 description: The patient's current password.
 *                 example: "currentPassword123!"
 *               newPassword:
 *                 type: string
 *                 description: The new password the patient wishes to set.
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