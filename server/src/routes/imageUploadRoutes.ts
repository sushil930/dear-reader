import express from 'express';
import { uploadImage } from '../controllers/imageUploadController.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for single file upload
const upload = multer(); // No disk storage here, as it's handled in the controller

router.post('/image', upload.single('image'), uploadImage);

export default router;
