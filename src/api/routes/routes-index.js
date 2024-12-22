import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/config.js';
import patientRouter from './patient-route.js';
import doctorRouter from './doctor-route.js';
import { authAccessToken } from '../middleware/auth-middleware.js';
import { authorizeUser } from '../middleware/access-middleware.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

// User routes
router.get('/check-authentication', authAccessToken, (req, res, next) => {
    res.send({authenticated: true});
});
router.get('/check-authorization', authAccessToken, authorizeUser, (req, res, next) => {
    res.send({authorized: true, role: req.user.role});
});
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);

router.get('/test-error', (req, res, next) => {
    const error = new Error('Test Error');
    next(error);
})

export default router;