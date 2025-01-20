import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/config.js';
import patientRouter from './patient-route.js';
import doctorRouter from './doctor-route.js';
import { authAccessToken } from '../middleware/auth-middleware.js';
import { getUser } from '../controllers/patient-controller-index.js';
const router = Router();


const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

// Patient Routes
router.use('/patient', patientRouter);

// Doctor Routes
router.use('/doctor', doctorRouter);

router.get('/profile', authAccessToken, (req, res) => {
    console.log(req);
    getUser(req, res);
});

router.get('/test-error', (req, res, next) => {
    const error = new Error('Test Error');
    next(error);
})

export default router;