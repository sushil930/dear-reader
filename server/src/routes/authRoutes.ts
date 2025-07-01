import { Router } from 'express';
import { register, login, getCurrentUser, forgotPassword, resetPassword, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.put('/profile', protect, updateUserProfile);

export default router;
