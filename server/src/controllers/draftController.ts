import { RequestHandler, Request, Response } from 'express';
import { prisma } from '../index.js';

export const createDraft: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { title, content, mood, excerpt, tags } = req.body;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required to create a draft.' });
      return;
    }

    const newDraft = await prisma.draft.create({
      data: {
        title,
        content,
        mood,
        excerpt,
        tags: tags || [], // Ensure tags is an array
        lastModified: new Date(),
        wordCount: content ? content.split(/\s+/).length : 0,
        author: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json(newDraft);
    return;
  } catch (error) {
    console.error('Error creating draft:', error);
    res.status(500).json({ message: 'Failed to create draft', error });
    return;
  }
};

export const getDraftsByUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required to fetch drafts.' });
    return;
    }
    const drafts = await prisma.draft.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      orderBy: { lastModified: 'desc' },
    });
    res.status(200).json(drafts);
    return;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ message: 'Failed to fetch drafts', error });
    return;
  }};
export const getDraftById: RequestHandler = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { id } = req.params;
    const draft = await prisma.draft.findFirst({
      where: { id, authorId: userId },
    });
    if (!draft) {
      res.status(404).json({ message: 'Draft not found' });
      return;
    }
    res.status(200).json(draft);
    return;
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({ message: 'Failed to fetch draft', error: (error as Error).message });
    return;
  }
};

export const updateDraft: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, mood, excerpt, tags } = req.body;

    const updatedDraft = await prisma.draft.update({
      where: { id },
      data: {
        title,
        content,
        mood,
        excerpt,
        tags: tags || [],
        lastModified: new Date(),
        wordCount: content ? content.split(/\s+/).length : 0,
      },
    });
    res.status(200).json(updatedDraft);
    return;
  } catch (error) {
    console.error('Error updating draft:', error);
    res.status(500).json({ message: 'Failed to update draft', error });
    return;
  }};

export const deleteDraft: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`User ${req.userId} attempting to delete draft ${id}`);
    const draft = await prisma.draft.findUnique({ where: { id } });
    if (!draft) {
      console.log(`Draft ${id} not found`);
      res.status(404).json({ message: 'Draft not found' });
      return;
    }
    if (draft.authorId !== req.userId) {
      console.log(`User ${req.userId} not authorized to delete draft ${id}`);
      res.status(403).json({ message: 'Not authorized to delete this draft' });
      return;
    }
    await prisma.draft.delete({ where: { id } });
    console.log(`Draft ${id} deleted by user ${req.userId}`);
    res.status(204).send(); // No Content
    return;
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ message: 'Failed to delete draft', error });
    return;
  }};

export const publishDraft: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const draft = await prisma.draft.findUnique({
      where: { id },
    });

    if (!draft) {
      res.status(404).json({ message: 'Draft not found' });
      return;
    }

    // Create a new entry from the draft
    const newEntry = await prisma.entry.create({
      data: {
        title: draft.title,
        content: draft.content,
        mood: draft.mood,
        excerpt: draft.excerpt,
        tags: draft.tags,
        authorId: draft.authorId,
        // You might want to add other fields like slug, readTime, bannerImage, etc.
        // For now, let's assume these are handled or can be added later.
        slug: draft.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, ''), // Basic slug generation
        readTime: Math.ceil((draft.wordCount || 0) / 200), // Assuming 200 words per minute, handle null wordCount
        date: new Date(),
      },
    });

    // Delete the draft after publishing
    await prisma.draft.delete({
      where: { id },
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error publishing draft:', error);
    res.status(500).json({ message: 'Failed to publish draft', error });
  }
};
