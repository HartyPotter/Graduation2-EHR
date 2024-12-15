import { redisClient } from '../../../loaders/redis-loader.js';
import * as utils from '../../../utils/utils-index.js';

export default async (req, res) => {
    try {        
        // const user = req.user;
        const user = await redisClient.hGet(`user:${req.user.id}`, "user");
        // Send success response
        return utils.sendSuccess(res, 'Fetched user data successfully!', { user: JSON.parse(user) });
    } catch (error) {
        console.error('Error in get-user controller:', error);
        return utils.sendError(res, error);
   }
};

/**
 * @swagger
 * /patient/get:
 *   get:
 *     summary: Get patients's data
 *     description: Fetches the patients's data and returns it.
 *     tags:
 *       - Patient
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Patient data fetched successfully.
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
 *                         phone_number:
 *                           type: string
 *                           example: "+201023456780"
 *                         insurance_number:
 *                           type: string
 *                           example: "INSC1234"
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