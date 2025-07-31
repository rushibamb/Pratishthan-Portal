const express = require('express');
const router = express.Router();
const {
  getAllSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  updateSponsorOrder,
} = require('../controllers/sponsorController');
const { protect } = require('../middleware/authMiddleware');

// GET route is public
// POST route is protected
router.route('/').get(getAllSponsors).post(protect, createSponsor);

// Route for reordering sponsors is protected
router.route('/order').put(protect, updateSponsorOrder);

// Routes for updating and deleting a specific sponsor are protected
router.route('/:id').put(protect, updateSponsor).delete(protect, deleteSponsor);

module.exports = router;
