import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getRecentEntries } from '../controllers/entryController.js';
import { getAllUserEntries, getAllPublicEntries, getPublicEntryBySlug, getEntryBySlug, createEntry, updateEntry, deleteEntry } from '../controllers/entryController.js';

const router = Router();

// Public route: get recent entries (first 3)
router.get('/recent', getRecentEntries);
// Public route: get all entries sorted by date
router.get('/all', getAllPublicEntries);
// Public route: fetch single entry by slug
router.get('/public/:slug', getPublicEntryBySlug);



// All entry routes below require authentication
router.use(protect);

// GET all entries for the authenticated user
router.get('/user', getAllUserEntries);
// GET a single entry by slug
router.get('/:slug', getEntryBySlug);

// POST create a new entry
router.post('/', createEntry);

// PUT update an entry by ID
router.put('/:id', updateEntry);

// DELETE an entry by ID
router.delete('/:id', deleteEntry);

export default router;
