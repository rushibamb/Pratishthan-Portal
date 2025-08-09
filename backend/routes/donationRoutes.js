const express = require('express');
const router = express.Router();
const {
  getDonationInfo,
  updateDonationInfo,
  createDonationInfo,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getDonationInfo);

// Protected routes
router.post('/', protect, createDonationInfo);
router.put('/', protect, updateDonationInfo);

module.exports = router;
