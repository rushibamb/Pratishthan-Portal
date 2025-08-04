const express = require('express');
const router = express.Router();
const {
  getAllMedia,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
  updateMediaOrder,
} = require('../controllers/mediaController');

// Route for getting all media and creating a new item
router.route('/').get(getAllMedia).post(createMediaItem);

// Route for reordering media items
router.route('/order').put(updateMediaOrder);

// Route for updating and deleting a specific media item
router.route('/:id').put(updateMediaItem).delete(deleteMediaItem);

module.exports = router;
