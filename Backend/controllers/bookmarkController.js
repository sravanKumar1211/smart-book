import Bookmark from '../models/Bookmark.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Get all bookmarks for authenticated user
// @route   GET /api/bookmarks
export const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user._id })
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: bookmarks.length,
    data: bookmarks
  });
});

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
export const createBookmark = asyncHandler(async (req, res) => {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both URL and title'
    });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid URL'
    });
  }

  const bookmark = await Bookmark.create({
    userId: req.user._id,
    url,
    title
  });

  res.status(201).json({
    success: true,
    data: bookmark
  });
});

// @desc    Update a bookmark
// @route   PUT /api/bookmarks/:id
export const updateBookmark = asyncHandler(async (req, res) => {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both URL and title'
    });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid URL'
    });
  }

  const bookmark = await Bookmark.findById(req.params.id);

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found'
    });
  }

  // Check if bookmark belongs to user
  if (bookmark.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this bookmark'
    });
  }

  bookmark.url = url;
  bookmark.title = title;
  await bookmark.save();

  res.json({
    success: true,
    data: bookmark
  });
});

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
export const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found'
    });
  }

  // Check if bookmark belongs to user
  if (bookmark.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this bookmark'
    });
  }

  await bookmark.deleteOne();

  res.json({
    success: true,
    message: 'Bookmark deleted successfully'
  });
});
