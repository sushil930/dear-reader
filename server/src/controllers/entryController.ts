import { Request, Response, NextFunction, RequestHandler } from 'express';
import { prisma } from '../index.js';
import { Entry } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

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
export const createEntry: RequestHandler = async (req, res) => {
  let { slug, lang, title, content, date, mood, readTime, excerpt, tags, bannerImage, translationGroup } = req.body;
  tags = Array.isArray(tags) ? tags : [];

  // If translationGroup is not provided, generate a new one (for the first entry in a group)
  if (!translationGroup) {
    translationGroup = createId();
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
        slug,
        lang,
        title,
        content,
        date,
        mood,
        readTime,
        excerpt,
        tags,
        bannerImage,
        translationGroup, // Add translationGroup
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

// Get a single entry by language and slug
export const getEntryByLangSlug: RequestHandler = async (req, res) => {
  const { lang, slug } = req.params;

  try {
    const entry = await prisma.entry.findFirst({
      where: {
        // @ts-ignore
        authorId: req.userId, // Ensure it belongs to the authenticated user
        slug: slug,
        lang: lang,
      },
    });

    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
      return;
    }

    // Ensure tags is always an array
    if (entry && !Array.isArray(entry.tags)) {
      entry.tags = [];
    }
    res.status(200).json(entry);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    return;
  }
};

// Get all entries belonging to a specific translation group
export const getAllByTranslationGroup: RequestHandler = async (req, res) => {
  const { translationGroup } = req.params;

  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found in request' });
      return;
    }

    const entries = await prisma.entry.findMany({
      where: {
        translationGroup: translationGroup,
        authorId: userId, // Ensure entries belong to the authenticated user
      },
    });

    if (entries.length === 0) {
      res.status(404).json({ message: 'No entries found for this translation group' });
      return;
    }

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

// Update an existing entry for the authenticated user
export const updateEntry: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { slug, lang, title, content, date, mood, readTime, excerpt, tags, bannerImage } = req.body;
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
        lang,
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
