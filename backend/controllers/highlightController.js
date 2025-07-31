const Highlight = require('../models/Highlight');

// @desc    Get highlights for a specific year
// @route   GET /api/highlights/:year
const getHighlightsByYear = async (req, res) => {
  try {
    const highlight = await Highlight.findOne({ year: req.params.year });
    if (!highlight) {
      // Return a structured empty response if the year is not found
      return res.status(200).json({ year: req.params.year, photos: [], videos: [] });
    }
    res.status(200).json(highlight);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a list of all available years
// @route   GET /api/highlights/years/all
const getAllYears = async (req, res) => {
    try {
        // Fetch all documents, but only select the 'year' field.
        const highlights = await Highlight.find({}).select('year -_id').sort({ year: 'desc' });
        // Map the result to an array of strings.
        const years = highlights.map(h => h.year);
        res.status(200).json(years);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new year for highlights
// @route   POST /api/highlights
const createYear = async (req, res) => {
  try {
    const { year } = req.body;
    const existingYear = await Highlight.findOne({ year });
    if (existingYear) {
      return res.status(400).json({ message: 'Year already exists' });
    }
    const newHighlightYear = new Highlight({ year, photos: [], videos: [] });
    const savedYear = await newHighlightYear.save();
    res.status(201).json(savedYear);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

// @desc    Delete an entire year's highlights
// @route   DELETE /api/highlights/:year
const deleteYear = async (req, res) => {
  try {
    const deletedYear = await Highlight.findOneAndDelete({ year: req.params.year });
    if (!deletedYear) {
      return res.status(404).json({ message: 'Year not found' });
    }
    res.status(200).json({ message: 'Highlight year deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a photo to a specific year
// @route   POST /api/highlights/:year/photos
const addPhoto = async (req, res) => {
  try {
    const highlight = await Highlight.findOne({ year: req.params.year });
    if (!highlight) {
      return res.status(404).json({ message: 'Year not found' });
    }
    highlight.photos.push(req.body); // req.body should be { title, src }
    await highlight.save();
    res.status(201).json(highlight);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

// @desc    Delete a photo from a specific year
// @route   DELETE /api/highlights/:year/photos/:photoId
const deletePhoto = async (req, res) => {
  try {
    const highlight = await Highlight.findOne({ year: req.params.year });
    if (!highlight) {
      return res.status(404).json({ message: 'Year not found' });
    }
    // Pull the photo with the matching _id from the photos array.
    highlight.photos.pull({ _id: req.params.photoId });
    await highlight.save();
    res.status(200).json(highlight);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Add similar functions for addVideo and deleteVideo
const addVideo = async (req, res) => {
    try {
        const highlight = await Highlight.findOne({ year: req.params.year });
        if (!highlight) return res.status(404).json({ message: 'Year not found' });
        highlight.videos.push(req.body); // req.body should be { title, thumbnail }
        await highlight.save();
        res.status(201).json(highlight);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request', error: error.message });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const highlight = await Highlight.findOne({ year: req.params.year });
        if (!highlight) return res.status(404).json({ message: 'Year not found' });
        highlight.videos.pull({ _id: req.params.videoId });
        await highlight.save();
        res.status(200).json(highlight);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = {
  getHighlightsByYear,
  getAllYears,
  createYear,
  deleteYear,
  addPhoto,
  deletePhoto,
  addVideo,
  deleteVideo,
};
