import { Request, Response, NextFunction, RequestHandler } from 'express';
import { prisma } from '../index.js';
import { Entry } from '@prisma/client';

// Get all entries for the authenticated user
export const getAllUserEntries: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }

    const entries = await prisma.entry.findMany({
      where: { authorId: userId },
      include: { author: { select: { name: true } } },
    });

    // Ensure tags is always an array for each entry
    const processedEntries = entries.map(entry => ({
      ...entry,
      tags: Array.isArray(entry.tags) ? entry.tags : [],
    }));

    res.status(200).json(processedEntries);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};

// Create a new entry for the authenticated user
// Helper function to generate a slug from a title
// Get a single entry by slug for the authenticated user
// Get recent entries (public)
export const getRecentEntries: RequestHandler = async (req, res) => {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: { date: 'desc' },
      take: 3,
      include: { author: { select: { name: true } } },
    });
    const processed = entries.map(e => ({ ...e, tags: Array.isArray(e.tags) ? e.tags : [] }));
    res.status(200).json(processed);
    return;
  } catch (error) {
    console.error('Error fetching recent entries:', error);
    res.status(500).json({ message: 'Failed to fetch recent entries', error: (error as Error).message });
    return;
  }
};

// Public route: get all entries sorted by date

// Public route: fetch a single entry by slug (public)
export const getPublicEntryBySlug: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const entry = await prisma.entry.findFirst({ where: { slug }, include: { author: { select: { name: true } } } });
    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
      return;
    }
    const processed = { ...entry, tags: Array.isArray(entry.tags) ? entry.tags : [] };
    res.status(200).json(processed);
    return;
  } catch (error) {
    console.error('Error fetching public entry:', error);
    res.status(500).json({ message: 'Failed to fetch entry', error: (error as Error).message });
    return;
  }
};

export const getAllPublicEntries: RequestHandler = async (req, res) => {
  try {
    const entries = await prisma.entry.findMany({
      where: { isPublic: true },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        bannerImage: true,
        tags: true,
        createdAt: true,
        date: true,
        author: {
          select: { name: true },
        },
      },
    });

    // Ensure tags are always arrays (safety layer)
    const processed = entries.map(e => ({
      ...e,
      tags: Array.isArray(e.tags) ? e.tags : [],
    }));

    res.status(200).json(processed);
  } catch (error) {
    console.error('Error fetching all entries:', error);
    res.status(500).json({
      message: 'Failed to fetch entries',
      error: (error as Error).message,
    });
  }
};

// Fetch a single entry by slug for the authenticated user
export const getEntryBySlug: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }
    const { slug } = req.params;
    const entry = await prisma.entry.findFirst({
      where: { slug, authorId: userId },
      include: { author: { select: { name: true } } },
    });
    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
      return;
    }
    // Ensure tags is always an array
    const processedEntry = { ...entry, tags: Array.isArray(entry.tags) ? entry.tags : [] };
    res.status(200).json(processedEntry);
    return;
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ message: 'Failed to fetch entry', error: (error as Error).message });
    return;
  }
};

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with - 
    .replace(/[^a-z0-9-]+/g, '') // Remove all non-word chars
    .replace(/^-+|-+$/g, ''); // Trim - from start and end
};

// Helper function to calculate word count
const calculateWordCount = (content: string): number => {
  if (!content) return 0;
  const words = content.trim().split(/\s+/);
  return words.length;
};

// Helper function to estimate read time (e.g., 200 words per minute)
const calculateReadTime = (wordCount: number): number => {
  if (wordCount === 0) return 0;
  return Math.ceil(wordCount / 200);
};

export const createEntry: RequestHandler = async (req, res) => {
  let { slug, title, content, date, mood, excerpt, tags, bannerImage } = req.body;

  const wordCount = calculateWordCount(content);
  const readTime = calculateReadTime(wordCount);

  // Ensure tags is an array
  tags = Array.isArray(tags) ? tags : [];

  // Generate slug if not provided
  if (!slug && title) {
    slug = generateSlug(title);
  }



  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }

    const newEntry = await prisma.entry.create({
      data: {
        slug: slug || '', // Ensure slug is not undefined
        title,
        content,
        date,
        mood,
        readTime,
        excerpt,
        tags,
        wordCount,
        bannerImage: bannerImage || null, // Set to null if not provided

        authorId: userId, // Link entry to the authenticated user
      },
    });

    res.status(201).json(newEntry);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};



// Update an existing entry for the authenticated user
export const updateEntry: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { slug, title, content, date, mood, readTime, excerpt, tags, bannerImage } = req.body;
  const processedTags = Array.isArray(tags) ? tags : [];

  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }

    const existingEntry = await prisma.entry.findUnique({
      where: { id: id },
    });

    if (!existingEntry || existingEntry.authorId !== userId) {
      res.status(404).json({ message: 'Entry not found or unauthorized' });
      return;
    }

    const updatedEntry = await prisma.entry.update({
      where: { id: id },
      data: {
        slug,

        title,
        content,
        date,
        mood,
        readTime,
        excerpt,
        tags: processedTags,
        bannerImage,
      },
    });

    res.status(200).json(updatedEntry);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};

// Delete an entry for the authenticated user
export const deleteEntry: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }

    const existingEntry = await prisma.entry.findUnique({
      where: { id: id },
    });

    if (!existingEntry || existingEntry.authorId !== userId) {
      res.status(404).json({ message: 'Entry not found or unauthorized' });
      return;
    }

    await prisma.entry.delete({
      where: { id: id },
    });

    res.status(204).send(); // No content for successful deletion
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};
