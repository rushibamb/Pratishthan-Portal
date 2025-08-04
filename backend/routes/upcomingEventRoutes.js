const express = require('express');
const router = express.Router();
const {
  getAllUpcomingEvents,
  createUpcomingEvent,
  updateUpcomingEvent,
  deleteUpcomingEvent,
} = require('../controllers/upcomingEventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllUpcomingEvents)
  .post(protect, createUpcomingEvent);

router.route('/:id')
  .put(protect, updateUpcomingEvent)
  .delete(protect, deleteUpcomingEvent);

module.exports = router;
