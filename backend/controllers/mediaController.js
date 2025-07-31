const Media = require('../models/Media');

/**
 * @desc    Get all media items, with optional filtering by type
 * @route   GET /api/media
 * @access  Public
 */
const getAllMedia = async (req, res) => {
  try {
    const filter = {};
    // Allow filtering by mediaType, e.g., /api/media?type=photo
    if (req.query.type) {
      filter.mediaType = req.query.type;
    }
    const media = await Media.find(filter).sort({ order: 'asc' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create a new media item (photo or video)
 * @route   POST /api/media
 * @access  Private
 */
const createMediaItem = async (req, res) => {
  try {
    const { mediaType, title, url, videoUrl } = req.body;

    const lastItem = await Media.findOne({ mediaType }).sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const newItem = new Media({
      mediaType,
      title,
      url,
      videoUrl,
      order: newOrder,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Update a media item
 * @route   PUT /api/media/:id
 * @access  Private
 */
const updateMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, videoUrl } = req.body;

    const updatedItem = await Media.findByIdAndUpdate(
      id,
      { title, url, videoUrl },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Delete a media item
 * @route   DELETE /api/media/:id
 * @access  Private
 */
const deleteMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Media.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    res.status(200).json({ message: 'Media item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update the order of multiple media items
 * @route   PUT /api/media/order
 * @access  Private
 */
const updateMediaOrder = async (req, res) => {
  try {
    const itemsToUpdate = req.body;
    const updatePromises = itemsToUpdate.map(item =>
      Media.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Media order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllMedia,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
  updateMediaOrder,
};
