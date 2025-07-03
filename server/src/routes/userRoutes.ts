import express from 'express';
import { uploadProfileImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for single file upload
const upload = multer();

router.post('/:id/upload-profile-image', protect, upload.single('profileImage'), uploadProfileImage);

export default router;
