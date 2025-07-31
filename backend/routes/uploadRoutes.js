const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

// Configure multer for in-memory storage.
// This means the uploaded file will be stored in a buffer in memory
// before being passed to Cloudinary, instead of being saved to the server's disk.
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @desc    Upload an image
 * @route   POST /api/upload
 * @access  Private
 */
// The 'protect' middleware is added here to ensure only logged-in admins can upload images.
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Multer adds a 'file' object to the request. We need to upload its buffer.
    // To do this, we convert the buffer to a base64 string and create a data URI.
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload the image to Cloudinary.
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'mandal-trust', // Optional: saves uploads to a specific folder in Cloudinary.
    });

    // Send back the secure URL of the uploaded image.
    res.status(200).json({
      message: 'Image uploaded successfully!',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server Error during image upload.' });
  }
});

module.exports = router;
