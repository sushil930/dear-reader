import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js'; // Assuming prisma is exported from index.ts

// Register a new user
export const register: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(400).json({ message: 'User already exists' });
      return; // Explicit return after sending response
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
    return; // Explicit return after sending response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return; // Explicit return after sending response
  }
};

// Login user
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return; // Explicit return after sending response
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return; // Explicit return after sending response
    }

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Set token in http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: 'Logged in successfully', token });
    return; // Explicit return after sending response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return; // Explicit return after sending response
  }
};

// Get current user (protected route example)

// Request password reset
export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHashed = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: resetTokenHashed,
        resetTokenExpiry: resetTokenExpiry,
      },
    });

    // In a real application, you would email this token to the user.
    // For now, we'll send it in the response for testing purposes.
    res.status(200).json({
      message: 'Password reset token generated. (In production, this would be emailed)',
      resetToken: resetToken, // For testing, remove in production
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};

// Reset password
export const resetPassword: RequestHandler = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash the incoming token to compare with the stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() }, // Token must not be expired
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired reset token' });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: 'Password has been reset successfully' });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Explicit return after sending response
    }
    res.json(user);
    return; // Explicit return after sending response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return; // Explicit return after sending response
  }
};
