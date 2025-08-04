const express = require('express');
const router = express.Router();
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  updateActivityOrder,
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// Route for creating a new activity (Protected)
router.route('/').post(protect, createActivity);

// Route for reordering activities (Protected)
router.route('/order').put(protect, updateActivityOrder);

// Route for getting activities (Public - no 'protect' middleware)
router.route('/:sectionType').get(getActivities);

// Route for updating and deleting a specific activity (Protected)
router.route('/:id').put(protect, updateActivity).delete(protect, deleteActivity);

module.exports = router;
