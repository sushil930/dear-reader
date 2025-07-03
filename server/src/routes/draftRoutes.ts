import { Router } from 'express';
import { createDraft, getDraftsByUser, getDraftById, updateDraft, deleteDraft, publishDraft } from '../controllers/draftController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createDraft);
router.get('/', protect, getDraftsByUser);
router.get('/:id', protect, getDraftById);
router.put('/:id', protect, updateDraft);
router.delete('/:id', protect, deleteDraft);
router.post('/publish/:id', protect, publishDraft);

export default router;
