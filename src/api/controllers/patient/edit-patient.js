import * as utils from '../../../utils/utils-index.js';
import { Patient } from '../../../models/models-index.js'
import * as validate from '../../validators/user-validator.js';
import { BaseError } from 'sequelize';
import { redisClient } from '../../../loaders/redis-loader.js';

const allowedFields = ['email', 'full_name', 'birth_date', 'address', 'photo_url', 'insurance_number', 'phone_number'];

export default async (req, res) => {
    try {
        // Validate that user provided valid data
        const { error } = validate.editPatient(req.body);
        if (error) throw new utils.ValidationError(error.details[0].message);

        // Destructure the request body
        const { email, full_name, birth_date, address, photo_url, insurance_number, phone_number } = req.body;

        // Check if the user tries to update a non-updatable property
        const invalidUpdate = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
        if (invalidUpdate.length > 0) throw new utils.ForbiddenError("Invalid fields in the request");

        // Fetch the user
        const user = await Patient.findOne({ where: { id: req.user.id } });
        if (!user) throw new utils.NotFoundError("User not found");

        // Prepare updated data
        const updateData = {};
        if (email) updateData.email = email;
        if (full_name) updateData.full_name = full_name;
        if (birth_date) updateData.birth_date = birth_date;
        if (address) updateData.address = address;
        if (photo_url) updateData.photo_url = photo_url;
        if (insurance_number) updateData.insurance_number = insurance_number;
        if (phone_number) updateData.phone_number = phone_number;

        // Update user data
        const [updatedRows, updatedUser] = await Patient.update(updateData, { where: { id: req.user.id }, returning: true });

        // Check if any rows were updated
        if (updatedRows === 0) {
            throw new BaseError("No changes made", 304, "Provided attributes matched the existing ones");
        }

        // Add updated user to redis
        await redisClient.hSet(`user:${user.id}`, "user", JSON.stringify(updatedUser));

        // Send success response
        return utils.sendSuccess(res, 'Edited user data successfully!');
    } catch (error) {
        console.error('Error in edit-user controller:', error);
        return utils.sendError(res, error);
    }
};

/**
 * @swagger
 * /user/edit-user:
 *   patch:
 *     summary: Edit user account information
 *     description: Updates the authenticated user's profile information. Only specified fields (full_name, email, address, photo_url) are allowed to be updated.
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
 *               full_name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Cityville"
 *               photo_url:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/photo.jpg"
 *             required:
 *               - full_name
 *               - email
 *     responses:
 *       200:
 *         description: User profile updated successfully.
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
 *                   example: "Edited user data successfully!"
 *       400:
 *         description: Validation error in the provided fields.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       403:
 *         description: Forbidden. Attempted to update non-updatable fields.
 *       404:
 *         description: User not found.
 *       304:
 *         description: No changes made. Provided attributes matched the existing ones.
 *       500:
 *         description: Server error.
 */
