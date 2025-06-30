import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getAllUserEntries, createEntry, updateEntry, deleteEntry, getEntryByLangSlug, getAllByTranslationGroup } from '../controllers/entryController.js';

const router = Router();

// All entry routes require authentication
router.use(protect);

// GET all entries for the authenticated user
router.get('/user', getAllUserEntries);

// POST create a new entry
router.post('/', createEntry);

// GET a single entry by language and slug
router.get('/:lang/:slug', getEntryByLangSlug);

// GET all entries belonging to a translation group
router.get('/group/:translationGroup', getAllByTranslationGroup);

// PUT update an entry by ID
router.put('/:id', updateEntry);

// DELETE an entry by ID
router.delete('/:id', deleteEntry);

export default router;
