import express from 'express';
import { signup, login, logout, refreshToken, getCurrentUser, updateUserRole, updateUser, updatePassword, sendOTP, verifyOTP } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { getUserById } from '../../frontend/src/api.js';

const router = express.Router();

router.post('/verify/send-otp', sendOTP);
router.post('/verify/email-otp', verifyOTP);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

router.get('/current', authenticateUser, getCurrentUser);
router.get('/user/:userId', getUserById);

router.patch('/:userId/role', updateUserRole)
router.patch('/update', authenticateUser, updateUser);
router.patch('/update-password', authenticateUser, updatePassword);

export default router;