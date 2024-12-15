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
 * /doctor/edit-user:
 *   patch:
 *     summary: Edit doctor's account information
 *     description: Updates the authenticated doctor's profile information. Only specific fields can be updated ('email', 'full_name', 'birth_date', 'address', 'photo_url', 'years_of_experience', 'phone_number', 'hospital_affiliations').
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: [] # Requires JWT authentication
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
 *                 example: johndoe@example.com
 *                 description: The user's new email address.
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *                 description: The user's full name.
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: 1985-10-15
 *                 description: The user's birth date in YYYY-MM-DD format.
 *               address:
 *                 type: string
 *                 example: 123 Main St, Cityville
 *                 description: The user's address.
 *               photo_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/photo.jpg
 *                 description: A URL pointing to the user's profile photo.
 *               phone_number:
 *                 type: string
 *                 example: +201234567890
 *                 description: The user's phone number.
 *               insurance_number:
 *                 type: string
 *                 example: "LSC1234"
 *                 description: The user's insurance number.
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Edited user data successfully!"
 *       400:
 *         description: Validation error in the provided fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       403:
 *         description: Forbidden. Attempted to update non-updatable fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid fields in the request."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       304:
 *         description: No changes made. Provided attributes matched the existing ones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No changes made."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
