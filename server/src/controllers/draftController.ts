import { RequestHandler, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDraft: RequestHandler = (async (req: Request, res: Response) => {
  try {
    const { title, content, mood, excerpt, tags } = req.body;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required to create a draft.' });
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
}) as RequestHandler;

export const getDraftsByUser = (async (req: Request, res: Response) => {
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
  }}) as RequestHandler;
export const getDraftById = (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const draft = await prisma.draft.findUnique({
      where: { id },
    });
    if (!draft) {
      res.status(404).json({ message: 'Draft not found' });
      return;
    }
    res.status(200).json(draft);
    return;
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({ message: 'Failed to fetch draft', error });
    return;
  }}) as RequestHandler;

export const updateDraft = (async (req: Request, res: Response) => {
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
  }}) as RequestHandler;

export const deleteDraft = (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.draft.delete({
      where: { id },
    });
    res.status(204).send(); // No Content
    return;
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ message: 'Failed to delete draft', error });
    return;
  }}) as RequestHandler;
