const mongoose = require('mongoose');

const UpcomingEventSchema = new mongoose.Schema(
  {
    title: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    dateTime: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    icon: {
      type: String,
      required: true, // e.g., 'ri-calendar-event-line'
    },
    iconBgColor: {
      type: String, // e.g., 'bg-yellow-500'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UpcomingEvent', UpcomingEventSchema);
