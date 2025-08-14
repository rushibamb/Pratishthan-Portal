const mongoose = require('mongoose');

// Define the schema for the ContactMessage collection.
const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // A 'read' status to help admins track which messages have been reviewed.
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
  }
);

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
