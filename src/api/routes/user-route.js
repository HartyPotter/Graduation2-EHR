import { Router } from 'express';
import { register, login, logout, verifyEmail, resendEmail, forgotPassword, resetPassword, refreshToken, changePassword, editUser, getUser, deleteUser } from '../controllers/user-controller-index.js'
import { authAccessToken } from '../middleware/auth-middleware.js';

const router = Router();

// AUTH
router.post('/register', register);
router.post('/login', login);

router.post('/verify-email', verifyEmail);
router.post('/resend-email', resendEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/logout', authAccessToken, logout);

router.get('/protected', authAccessToken, (req, res) => {
    res.send('This is a protected route. But, you are in !!')
})


// EDIT
router.post('/change-password', authAccessToken, changePassword);
router.put('/edit-user', authAccessToken, editUser);

router.get('/get-user', authAccessToken, getUser);
router.delete('/delete-user', authAccessToken, deleteUser);

export default router