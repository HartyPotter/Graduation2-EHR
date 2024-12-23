import { Router } from 'express';
import record from './record-route.js';

const router = Router();

router.use('/patient', record);

export default router;
