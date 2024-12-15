import { Doctor } from '../../../models/models-index.js';
import * as validate from '../../validators/user-validator.js';
import * as utils from '../../../utils/utils-index.js';
import { redisClient } from '../../../loaders/redis-loader.js';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    // Validate user input
    const { error } = validate.doctorRegister(req.body);

    if (error) {
      throw new utils.ValidationError(error.details[0].message);
    }

    // Check if user already exists by email
    const exists = await Doctor.findOne({ where: { email: req.body.email } });

    if (exists) {
      throw new utils.ConflictError('User with this email already exists');
    }

    // Hash the password
    const hashed = await bcrypt.hash(req.body.password, 10);

    // Generate a unique ID for the user
    const user_id = utils.generateUserId('doctor', req.body.national_id);

    // Create the new user
    const user = await Doctor.create({
      id: user_id,
      email: req.body.email,
      full_name: req.body.full_name,
      password: hashed,
      role: req.body.role, // Default role
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      address: req.body.address,
      national_id: req.body.national_id,
      photo_url: req.body.photo_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
      is_verified: false,
      specialization: req.body.specialization,
      license_number: req.body.license_number,
      years_of_experience: req.body.years_of_experience,
      phone_number: req.body.phone_number,
      educational_background: req.body.educational_background,
      hospital_affiliations: req.body.hospital_affiliations
    });

    // Generate email verification code and token
    const emailCode = utils.generateRandomCode(4);
    const confirmCodeToken = await utils.signConfirmCodeToken(user.id, user.email, emailCode);
    
    // Send verification email 
    await utils.sendVerificationEmail(req.body.email, req.body.full_name, emailCode, 'register');
    
    // Save the signed confirmation code in redis
    await redisClient.set(`confirmCode:${user.email}`, confirmCodeToken, { 'EX': 300 });

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    // Send success response
    return utils.sendSuccess(res, 'You registered successfully.', { user: userData , confirmToken: confirmCodeToken } );
  } catch (error) {
    // Send error response
    console.error('Error in register controller:', error);
    return utils.sendError(res, error);
  }
};


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided details and sends a verification code to the user's email.
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
 *                 description: The user's unique email.
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *                 description: The user's full name.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *                 description: The user's password.
 *               role:
 *                 type: string
 *                 example: patient
 *                 description: The user's role in the system.
 *               gender:
 *                 type: string
 *                 example: male
 *                 description: The user's gender.
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *                 description: The user's birth date.
 *               address:
 *                 type: string
 *                 example: 123 Main St, Anytown, USA
 *                 description: The user's address.
 *               national_id:
 *                 type: string
 *                 example: A12345678
 *                 description: The user's national ID.
 *               photo_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/photo.jpg
 *                 description: URL to the user's profile photo.
 *     responses:
 *       200:
 *         description: Successfully registered the user.
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
 *                   example: You registered successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         email:
 *                           type: string
 *                           example: user@example.com
 *                         full_name:
 *                           type: string
 *                           example: John Doe
 *                         role:
 *                           type: string
 *                           example: patient
 *                         gender:
 *                           type: string
 *                           example: male
 *                         birth_date:
 *                           type: string
 *                           example: 1990-01-01
 *                         address:
 *                           type: string
 *                           example: 123 Main St, Anytown, USA
 *                         national_id:
 *                           type: string
 *                           example: A12345678
 *                         photo_url:
 *                           type: string
 *                           example: https://example.com/photo.jpg
 *                         is_verified:
 *                           type: boolean
 *                           example: false
 *                     confirmToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error in request data.
 *       409:
 *         description: Conflict error, such as when a user with the given email already exists.
 *       500:
 *         description: Server error.
 */
