import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../../config/config.js';
import { authAccessToken } from '../controller/auth-access-token.js';
import * as Controller from '../controller/controller-index.js'

// import { authorizeUser } from '../middleware/access-middleware.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

// User routes
router.get('/check-authentication', authAccessToken, (req, res, next) => {
    res.send({authenticated: true});
});

// Patient
router.post('/p/login', Controller.p_login);
router.post('/p/forgot-password', Controller.p_forgotPassword);
router.post('/p/reset-password', Controller.p_resetPassword);

router.post('/p/refreshToken', authAccessToken, Controller.p_refreshToken);
router.post('/p/change-password', authAccessToken, Controller.p_changePassword);

// Doctor
router.post('/d/login', Controller.d_login);
router.post('/d/forgot-password', Controller.d_forgotPassword);
router.post('/d/reset-password', Controller.d_resetPassword);

router.post('/d/refreshToken', authAccessToken, Controller.d_refreshToken);
router.post('/d/change-password', authAccessToken, Controller.d_changePassword);


// router.get('/check-authorization', authAccessToken, authorizeUser, (req, res, next) => {
//     res.send({authorized: true, role: req.user.role});
// });

router.get('/test-error', (req, res, next) => {
    const error = new Error('Test Error');
    next(error);
})

export default router;