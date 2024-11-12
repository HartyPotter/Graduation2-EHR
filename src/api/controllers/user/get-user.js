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
 * /user/get-user:
 *   get:
 *     summary: Get user data
 *     description: Fetches the user data from Redis and returns it.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data fetched successfully.
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
 *                   example: "Fetched user data successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "johndoe@example.com"
 *                     full_name:
 *                       type: string
 *                       example: "John Doe"
 *                     address:
 *                       type: string
 *                       example: "123 Main Street, City, Country"
 *                     photo_url:
 *                       type: string
 *                       example: "http://example.com/photo.jpg"
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       500:
 *         description: Server error.
 */
