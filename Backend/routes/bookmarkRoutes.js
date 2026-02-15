import express from 'express';
import {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
} from '../controllers/bookmarkController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

router.route('/')
  .get(getBookmarks)
  .post(createBookmark);

router.route('/:id')
  .put(updateBookmark)
  .delete(deleteBookmark);

export default router;
