const UpcomingEvent = require('../models/UpcomingEvent');

// @desc    Get all upcoming events
// @route   GET /api/upcoming-events
// @access  Public
const getAllUpcomingEvents = async (req, res) => {
  try {
    const events = await UpcomingEvent.find({}).sort({ createdAt: 'asc' });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new upcoming event
// @route   POST /api/upcoming-events
// @access  Private
const createUpcomingEvent = async (req, res) => {
  try {
    const { title, dateTime, icon, iconBgColor } = req.body;
    const newEvent = new UpcomingEvent({ title, dateTime, icon, iconBgColor });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

// @desc    Update an upcoming event
// @route   PUT /api/upcoming-events/:id
// @access  Private
const updateUpcomingEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dateTime, icon, iconBgColor } = req.body;
    const updatedEvent = await UpcomingEvent.findByIdAndUpdate(
      id,
      { title, dateTime, icon, iconBgColor },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

// @desc    Delete an upcoming event
// @route   DELETE /api/upcoming-events/:id
// @access  Private
const deleteUpcomingEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await UpcomingEvent.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllUpcomingEvents,
  createUpcomingEvent,
  updateUpcomingEvent,
  deleteUpcomingEvent,
};
