const Event = require('../models/Event');

/**
 * @desc    Get all events, sorted by their order
 * @route   GET /api/events
 * @access  Public
 */
const getAllEvents = async (req, res) => {
  try {
    // Fetch all documents from the Event collection.
    // .sort({ order: 1 }) ensures the events are returned in ascending order
    // based on the 'order' field, which is crucial for the timeline display.
    const events = await Event.find({}).sort({ order: 'asc' });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private (will be protected later)
 */
const createEvent = async (req, res) => {
  try {
    const { title, date, time, activities } = req.body;

    // To add the new event to the end of the list, we find the current highest order number.
    const lastEvent = await Event.findOne().sort({ order: -1 });
    const newOrder = lastEvent ? lastEvent.order + 1 : 0;

    const newEvent = new Event({
      title,
      date,
      time,
      activities,
      order: newOrder,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Update an existing event
 * @route   PUT /api/events/:id
 * @access  Private (will be protected later)
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, activities } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, time, activities },
      { new: true } // { new: true } returns the modified document.
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private (will be protected later)
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update the order of multiple events
 * @route   PUT /api/events/order
 * @access  Private (will be protected later)
 */
const updateEventOrder = async (req, res) => {
  try {
    // Expecting an array of objects, e.g., [{ _id: "...", order: 0 }, { _id: "...", order: 1 }]
    const eventsToUpdate = req.body;

    // Create an array of promises for each update operation.
    const updatePromises = eventsToUpdate.map(event =>
      Event.findByIdAndUpdate(event._id, { order: event.order })
    );

    // Execute all update promises concurrently.
    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Event order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventOrder,
};
