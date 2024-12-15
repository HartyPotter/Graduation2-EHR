import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/config.js';
import patientRouter from './patient-route.js';
import doctorRouter from './doctor-route.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

// User routes
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);

router.get('/test-error', (req, res, next) => {
    const error = new Error('Test Error');
    next(error);
})

export default router;