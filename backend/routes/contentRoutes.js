const express = require('express');
const router = express.Router();
const {
  getPageContent,
  updatePageContent,
} = require('../controllers/contentController');

// Define the route for getting content for a specific section.
// e.g., a GET request to /api/content/hero will trigger getPageContent.
router.get('/:sectionName', getPageContent);

// Define the route for updating content for a specific section.
// e.g., a PUT request to /api/content/hero will trigger updatePageContent.
router.put('/:sectionName', updatePageContent);

module.exports = router;
