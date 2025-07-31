const mongoose = require('mongoose');

// Define the schema for the Media collection.
const MediaSchema = new mongoose.Schema(
  {
    // Differentiates between 'photo' and 'video' entries.
    mediaType: {
      type: String,
      enum: ['photo', 'video'], // Ensures only these two values are allowed.
      required: true,
    },
    // Title for a video or caption for a photo.
    title: {
      type: String,
      required: true,
    },
    // URL for the full-size photo or the video thumbnail.
    url: {
      type: String,
      required: true,
    },
    // URL for the video link (e.g., YouTube). Only required for videos.
    videoUrl: {
      type: String,
    },
    // The 'order' field will be used for sequencing items in the gallery.
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
  }
);

// Create and export the Mongoose model for the 'Media' collection.
module.exports = mongoose.model('Media', MediaSchema);
