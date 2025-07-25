import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); // For parsing cookies
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow requests from your frontend
  credentials: true, // Allow cookies to be sent
}));

// Basic route
app.get('/', (req, res) => {
  res.send('Reflections Diary API is running!');
});

import authRoutes from './routes/authRoutes.js';
import entryRoutes from './routes/entryRoutes.js';
import draftRoutes from './routes/draftRoutes.js';
import imageUploadRoutes from './routes/imageUploadRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/drafts', draftRoutes);
app.use('/api/upload', imageUploadRoutes);
app.use('/api/users', userRoutes);

// Warm-up endpoint
app.get('/api/warmup', async (req, res) => {
  try {
    // Perform a simple database query to initialize the connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send('Server warmed up');
  } catch (error) {
    res.status(500).send('Error warming up server');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle Prisma disconnect on server shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
