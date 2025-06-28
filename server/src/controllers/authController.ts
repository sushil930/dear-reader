import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index'; // Assuming prisma is exported from index.ts

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
