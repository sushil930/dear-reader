import { Request, Response } from 'express';
import { prisma } from '../index.js';
import path from 'path';
import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfileImage = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'profile_images', resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(req.file!.buffer);
    });

    // @ts-ignore
    const profileImageUrl = result.secure_url;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: profileImageUrl },
    });

    res.status(200).json({ message: 'Profile image uploaded successfully', profileImage: updatedUser.profileImage });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Failed to upload profile image' });
  }
};
