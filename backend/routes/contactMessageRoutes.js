const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/contactMessageController');
const { protect } = require('../middleware/authMiddleware');

// GET route is protected (admin only)
// POST route is public for form submission
router.route('/').get(protect, getAllMessages).post(createMessage);

// Routes for updating and deleting a specific message are protected
router.route('/:id').put(protect, updateMessageStatus).delete(protect, deleteMessage);

module.exports = router;
