const cloudinary = require('cloudinary').v2;

// Configure the Cloudinary SDK with credentials from your .env file.
// This setup is necessary for the SDK to authenticate with your Cloudinary account.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
