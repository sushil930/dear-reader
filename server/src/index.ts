import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client with Accelerate
export const prisma = new PrismaClient().$extends(withAccelerate());

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
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



app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/drafts', draftRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle Prisma disconnect on server shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
