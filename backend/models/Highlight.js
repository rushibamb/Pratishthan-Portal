    const mongoose = require('mongoose');

// Sub-schema for a single photo within a highlight year.
const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
});

// Sub-schema for a single video within a highlight year.
const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

// Main schema for the highlights of a specific year.
const HighlightSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      unique: true, // Each year can only have one highlight document.
    },
    photos: [PhotoSchema], // An array of photo documents.
    videos: [VideoSchema], // An array of video documents.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Highlight', HighlightSchema);
