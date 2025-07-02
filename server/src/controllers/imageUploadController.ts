import { Request, Response, RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Define the directory for storing uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Controller for image upload
export const uploadImage: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return; // Explicitly return void after sending the response
  }

  // Construct the URL for the uploaded image
  // Assuming the server is serving static files from the 'uploads' directory
  const imageUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
};
