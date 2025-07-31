const mongoose = require('mongoose');

// Define the schema for the Sponsor collection.
const SponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    // The 'description' will be an object to hold both English and Marathi versions.
    description: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    // The 'category' will also support multiple languages.
    category: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    // The 'order' field will be used to determine the sequence of sponsors.
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
  }
);

// Create and export the Mongoose model for the 'Sponsor' collection.
module.exports = mongoose.model('Sponsor', SponsorSchema);
