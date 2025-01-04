import { Patient, Token } from '../../../models/models-index.js';
import * as validate from '../../validators/user-validator.js';
import * as utils from '../../../utils/utils-index.js'
import bcrypt from 'bcrypt';
import { redisClient } from '../../../loaders/redis-loader.js';

export default async (req, res) => {
  try {
    // Validate login data
    const { error } = validate.patientLogin(req.body);
    
    if (error) {
      throw new utils.ValidationError(error.details[0].message);
    }

    // Find the user in the database
    const user = await Patient.findOne({
      where: {
        email: req.body.email,
        is_verified: true,
        // is_activated: true,
      },
    });
    
    if (!user) throw new utils.NotFoundError('User not found or not verified');

    // Check if password is correct
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new utils.ValidationError('Invalid password');
    
    // Generate tokens
    const accessToken = await utils.signAccessToken(user.id, 'patient');
    const refreshToken = await utils.signRefreshToken(user.id, 'patient');
    
    // Get the user's IP address from the request
    const userIp = req.headers['x-forwarded-for'] || req.ip;
    
    
    // Update the refresh token in the database using Sequelize
    await Token.upsert({
      user_id: user.id,
      refresh_token: refreshToken,
      user_type: "patient",
      valid: true,
      expires_in: new Date(Date.now() + 4 * 604800000), // 7 days
      created_at: new Date(),
      created_by_ip: userIp, // Add the IP address here
    });
    
    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;
    
    // Add user info and refresh token to Redis for faster access
    await redisClient.hSet(`user:${userData.id}`, {"user": JSON.stringify(userData), "refreshToken": refreshToken});
    await redisClient.expire(`user:${userData.id}`, 2592000);
    
    // Send successful response
    return utils.sendSuccess(res, 'Login successful',
      {
        user: { ...userData },
        accessToken,
        refreshToken,
      }
    );
    
  } catch (error) {
    // Log the detailed error with stack trace
    console.error('Error in login controller:', error);
    return utils.sendError(res, error);
  }
};


/**
 * @swagger
 * /patient/login:
 *   post:
 *     summary: Patient Login
 *     description: Authenticate a verified and activated patient by providing valid credentials.
 *     tags:
 *       - Patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: The email address of the patient.
 *               password:
 *                 type: string
 *                 example: "SecurePassword123!"
 *                 description: The password of the patient.
 *             required:  # Specify required fields
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully authenticated the patient and returned user details with tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]  # Use enum for clarity
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:  # Correct indentation here
 *                           type: string
 *                           example: "PT123"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         full_name:
 *                           type: string
 *                           example: "John Doe"
 *                         gender:
 *                           type: string
 *                           example: "male"
 *                         birth_date:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01"
 *                         address:
 *                           type: string
 *                           example: "123 Main St"
 *                         national_id:
 *                           type: string
 *                           example: "A123456789"
 *                         photo_url:
 *                           type: string
 *                           example: "https://example.com/photo.jpg"
 *                         is_verified:
 *                           type: boolean
 *                           example: true
 *                         phone_number:
 *                           type: string
 *                           example: "+201023456780"
 *                         insurance_number:
 *                            type: string
 *                            example: "INSC1234"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-11-01T00:00:00.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-11-10T00:00:00.000Z"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:  # Consistent structure for error responses (status, message)
 *         description: Missing or invalid fields in the request.
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
 *                   example: "Invalid email or password format."
 *       404:
 *         description: Doctor not found or not verified.
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
 *                   example: "Doctor not found or not verified."
 *       403:
 *         description: Incorrect password.
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
 *                   example: "Incorrect password."
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
 *                   example: "An unexpected error occurred. Please try again later."
 */
