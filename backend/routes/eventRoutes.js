const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventOrder,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// GET route is public for website display
// POST route is protected for creating a new event
router.route('/').get(getAllEvents).post(protect, createEvent);

// Route for reordering events is protected
router.route('/order').put(protect, updateEventOrder);

// Routes for updating and deleting a specific event are protected
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;
