    const Activity = require('../models/Activity');

/**
 * @desc    Get all activities, filtered by sectionType
 * @route   GET /api/activities/:sectionType
 * @access  Public
 */
const getActivities = async (req, res) => {
  try {
    const { sectionType } = req.params;
    const activities = await Activity.find({ sectionType }).sort({ order: 'asc' });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create a new activity
 * @route   POST /api/activities
 * @access  Private
 */
const createActivity = async (req, res) => {
  try {
    const { sectionType, title, description, imageUrl, icon } = req.body;

    const lastActivity = await Activity.findOne({ sectionType }).sort({ order: -1 });
    const newOrder = lastActivity ? lastActivity.order + 1 : 0;

    const newActivity = new Activity({
      sectionType,
      title,
      description,
      imageUrl,
      icon,
      order: newOrder,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Update an existing activity
 * @route   PUT /api/activities/:id
 * @access  Private
 */
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, icon } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { title, description, imageUrl, icon },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Delete an activity
 * @route   DELETE /api/activities/:id
 * @access  Private
 */
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update the order of multiple activities
 * @route   PUT /api/activities/order
 * @access  Private
 */
const updateActivityOrder = async (req, res) => {
  try {
    const activitiesToUpdate = req.body;
    const updatePromises = activitiesToUpdate.map(activity =>
      Activity.findByIdAndUpdate(activity._id, { order: activity.order })
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Activity order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  updateActivityOrder,
};
