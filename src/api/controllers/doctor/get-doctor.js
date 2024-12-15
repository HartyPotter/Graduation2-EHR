import { redisClient } from '../../../loaders/redis-loader.js';
import * as utils from '../../../utils/utils-index.js';

export default async (req, res) => {
    try {        
        const { userData: user } = req.user;
        // const user = await redisClient.hGet(`user:${req.user.id}`, "user");
        console.log(user);

        // Send success response
        return utils.sendSuccess(res, 'Fetched user data successfully!', { user });
    } catch (error) {
        console.error('Error in get-user controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /doctor/get:
 *   get:
 *     summary: Get doctor's data
 *     description: Fetches the doctor's data and returns it.
 *     tags:
 *       - Doctor
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor data fetched successfully.
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
 *                   example: "Fetched user data successfully!"
 *                 user:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 123
 *                         email: 
 *                           type: string
 *                           example: "doctor@example.com"
 *                         full_name:
 *                           type: string
 *                           example: "Mark Greyson"
 *                         gender:
 *                           type: string
 *                           example: "male"
 *                         birth_date:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01"
 *                         address:
 *                           type: string
 *                           example: "123 Main St, Cityville, Country"
 *                         national_id:
 *                           type: string
 *                           example: "12345678901234"
 *                         photo_url:
 *                           type: string
 *                           example: "https://example.com/photo.jpg"
 *                         is_verified:
 *                           type: boolean
 *                           example: true
 *                         specialization:
 *                           type: string
 *                           example: "Cardiology"
 *                         license_number:
 *                           type: string
 *                           example: "LSC123"
 *                         years_of_experience:
 *                           type: integer
 *                           example: 20
 *                         phone_number:
 *                           type: string
 *                           example: "+201023456780"
 *                         educational_background:
 *                           type: string
 *                           example: "Cairo University, Faculty of Medicine"
 *                         hospital_affiliations:
 *                           type: string
 *                           example: "Dr. Magdy Yaacoub Heart Center in Aswan"
  *       401:
 *         description: Unauthorized. User is not authenticated.
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
 *                   example: "Unauthorized"  
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
 *                   example: "Internal server error"
 */