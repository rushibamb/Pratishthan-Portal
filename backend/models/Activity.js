const mongoose = require('mongoose');

// Define the schema for the Activity collection.
const ActivitySchema = new mongoose.Schema(
  {
    // Differentiates between 'social' and 'cultural' activities.
    sectionType: {
      type: String,
      enum: ['social', 'cultural'],
      required: true,
    },
    title: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    description: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Activity', ActivitySchema);
