import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js'; // Assuming prisma is exported from index.ts

// Register a new user
export const register: RequestHandler = async (req, res) => {
  const { name, email, password, bio, location, website, writingStreak, viewsThisMonth, engagements, commentsCount, totalReadingTime, defaultMood, autoSave, publicProfile, showReadingTime, allowComments, emailNotifications, commentNotifications, likeNotifications, weeklyDigest } = req.body;

  // Check if user exists
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with all fields, using provided values or defaults
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      bio: bio || null,
      location: location || null,
      website: website || null,
      writingStreak: writingStreak || 0,
      viewsThisMonth: viewsThisMonth || 0,
      engagements: engagements || 0,
      commentsCount: commentsCount || 0,
      totalReadingTime: totalReadingTime || 0,
      defaultMood: defaultMood || null,
      autoSave: autoSave !== undefined ? autoSave : true,
      publicProfile: publicProfile !== undefined ? publicProfile : false,
      showReadingTime: showReadingTime !== undefined ? showReadingTime : true,
      allowComments: allowComments !== undefined ? allowComments : true,
      emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
      commentNotifications: commentNotifications !== undefined ? commentNotifications : true,
      likeNotifications: likeNotifications !== undefined ? likeNotifications : true,
      weeklyDigest: weeklyDigest !== undefined ? weeklyDigest : true,
    },
  });

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  res.status(201).json({ token, user });
};

// Login user
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        entries: {
          select: {
            id: true, slug: true, title: true, content: true, date: true, mood: true, readTime: true, excerpt: true, tags: true, bannerImage: true, views: true, createdAt: true, updatedAt: true,
             author: { select: { name: true } }
          }
        },
        drafts: {
          select: {
            id: true, title: true, content: true, mood: true, excerpt: true, tags: true, lastModified: true, wordCount: true
          }
        }
      }
    });
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

    // Remove password from user object before sending
    const { password: _password, ...userWithoutPassword } = user;

    // Set token in http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: 'Logged in successfully', token, user: userWithoutPassword });
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
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        location: true,
        website: true,
        writingStreak: true,
        viewsThisMonth: true,
        engagements: true,
        commentsCount: true,
        totalReadingTime: true,
        defaultMood: true,
        autoSave: true,
        publicProfile: true,
        showReadingTime: true,
        allowComments: true,
        emailNotifications: true,
        commentNotifications: true,
        likeNotifications: true,
        weeklyDigest: true,
        profileImage: true,
        createdAt: true,
        entries: {
          select: {
            id: true,
            slug: true,
            title: true,
            content: true,
            date: true,
            mood: true,
            readTime: true,
            excerpt: true,
            tags: true,
            bannerImage: true,
            views: true,
            createdAt: true,
            updatedAt: true,
            author: { select: { name: true } },
          },
        },
        drafts: {
          select: {
            id: true,
            title: true,
            content: true,
            mood: true,
            excerpt: true,
            tags: true,
            lastModified: true,
            wordCount: true,
          },
        },
      },
    });

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

export const updateUserProfile: RequestHandler = async (req, res) => {
  const { name, bio, location, website, defaultMood, autoSave, publicProfile, showReadingTime, allowComments, emailNotifications, commentNotifications, likeNotifications, weeklyDigest } = req.body;

  try {
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized, no user ID' });
      return;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name !== undefined ? name : undefined,
        bio: bio !== undefined ? bio : undefined,
        location: location !== undefined ? location : undefined,
        website: website !== undefined ? website : undefined,
        defaultMood: defaultMood !== undefined ? defaultMood : undefined,
        autoSave: autoSave !== undefined ? autoSave : undefined,
        publicProfile: publicProfile !== undefined ? publicProfile : undefined,
        showReadingTime: showReadingTime !== undefined ? showReadingTime : undefined,
        allowComments: allowComments !== undefined ? allowComments : undefined,
        emailNotifications: emailNotifications !== undefined ? emailNotifications : undefined,
        commentNotifications: commentNotifications !== undefined ? commentNotifications : undefined,
        likeNotifications: likeNotifications !== undefined ? likeNotifications : undefined,
        weeklyDigest: weeklyDigest !== undefined ? weeklyDigest : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        location: true,
        website: true,
        writingStreak: true,
        viewsThisMonth: true,
        engagements: true,
        commentsCount: true,
        totalReadingTime: true,
        defaultMood: true,
        autoSave: true,
        publicProfile: true,
        showReadingTime: true,
        allowComments: true,
        emailNotifications: true,
        commentNotifications: true,
        likeNotifications: true,
        weeklyDigest: true,
        profileImage: true,
        createdAt: true,
        entries: { // Include entries and drafts to match the structure returned by getCurrentUser
          select: {
            id: true, title: true, content: true, date: true, mood: true, readTime: true, excerpt: true, tags: true, bannerImage: true, views: true, createdAt: true, updatedAt: true
          }
        },
        drafts: {
          select: {
            id: true, title: true, content: true, mood: true, excerpt: true, tags: true, lastModified: true, wordCount: true
          }
        }
      }
    });

    res.json(user);
    return;
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export default {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updateUserProfile
};
