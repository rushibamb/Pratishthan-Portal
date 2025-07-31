const express = require('express');
const router = express.Router();
// Correctly import the memberController
const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  updateMemberOrder,
} = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');

// GET route is public
// POST route is protected
router.route('/').get(getAllMembers).post(protect, createMember);

// Route for reordering members is protected
router.route('/order').put(protect, updateMemberOrder);

// Routes for updating and deleting a specific member are protected
router.route('/:id').put(protect, updateMember).delete(protect, deleteMember);

module.exports = router;
