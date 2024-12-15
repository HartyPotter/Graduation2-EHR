import { Router } from 'express';
import { register, login, logout, verifyEmail, resendEmail, forgotPassword, resetPassword, refreshToken, changePassword, editDoctor, getDoctor, deleteDoctor } from '../controllers/doctor-controller-index.js';
import { authorizeUser, authAccessToken } from '../middleware/middleware-index.js';

const router = Router();

// AUTH
router.post('/register', register);
router.post('/login', login);

router.post('/verify-email', verifyEmail);
router.post('/resend-email', resendEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/logout', authAccessToken, logout);

router.get('/check-authentication', authAccessToken, (req, res) => {
    res.send({authenticated: true});
})

router.get('/check-authorization', authAccessToken, authorizeUser, (req, res) => {
    res.send({authorized: true, role: req.user.role});
})

router.post('/refreshToken', authAccessToken, refreshToken);


// EDIT
router.post('/change-password', authAccessToken, changePassword);
router.put('/edit-doctor', authAccessToken, editDoctor);

router.get('/get-doctor', authAccessToken, getDoctor);
router.delete('/delete-doctor', authAccessToken, deleteDoctor);

export default router