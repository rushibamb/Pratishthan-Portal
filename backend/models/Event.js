const mongoose = require('mongoose');

// Define the schema for the Event collection.
const EventSchema = new mongoose.Schema(
  {
    // The 'title' will be an object to hold both English and Marathi versions.
    title: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    // The 'date' for the event, e.g., "Day 1".
    date: {
      type: String,
      required: true,
    },
    // The 'time' for the event, e.g., "6:00 AM - 8:00 PM".
    time: {
      type: String,
      required: true,
    },
    // The 'activities' will also be an object for multilingual support.
    activities: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    // The 'order' field will be used to determine the sequence of events
    // in the timeline. We can sort by this field to allow for reordering.
    order: {
      type: Number,
      required: true,
      default: 0, // A default value for the order.
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
  }
);

// Create and export the Mongoose model for the 'Event' collection.
// Mongoose will create a collection named 'events' in the database.
module.exports = mongoose.model('Event', EventSchema);
