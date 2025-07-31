const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for registering the admin user.
router.post('/register', registerUser);

// Route for logging in the admin user.
router.post('/login', loginUser);

module.exports = router;
