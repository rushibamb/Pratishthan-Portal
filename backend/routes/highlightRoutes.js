const express = require('express');
const router = express.Router();
const {
  getHighlightsByYear,
  getAllYears,
  createYear,
  deleteYear,
  addPhoto,
  deletePhoto,
  addVideo,
  deleteVideo,
} = require('../controllers/highlightController');
const { protect } = require('../middleware/authMiddleware');

// Route for creating a new year is protected
router.route('/').post(protect, createYear);

// Route for getting all available years is public
router.route('/years/all').get(getAllYears);

// GET is public, DELETE is protected
router.route('/:year').get(getHighlightsByYear).delete(protect, deleteYear);

// Routes for managing photos are protected
router.route('/:year/photos').post(protect, addPhoto);
router.route('/:year/photos/:photoId').delete(protect, deletePhoto);

// Routes for managing videos are protected
router.route('/:year/videos').post(protect, addVideo);
router.route('/:year/videos/:videoId').delete(protect, deleteVideo);

module.exports = router;
