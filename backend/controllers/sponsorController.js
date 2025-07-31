const Sponsor = require('../models/Sponsor');

/**
 * @desc    Get all sponsors, sorted by their order
 * @route   GET /api/sponsors
 * @access  Public
 */
const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({}).sort({ order: 'asc' });
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create a new sponsor
 * @route   POST /api/sponsors
 * @access  Private
 */
const createSponsor = async (req, res) => {
  try {
    const { name, logoUrl, description, category } = req.body;

    const lastSponsor = await Sponsor.findOne().sort({ order: -1 });
    const newOrder = lastSponsor ? lastSponsor.order + 1 : 0;

    const newSponsor = new Sponsor({
      name,
      logoUrl,
      description,
      category,
      order: newOrder,
    });

    const savedSponsor = await newSponsor.save();
    res.status(201).json(savedSponsor);
  } catch (error) {
    // **FIX: Improved Error Handling**
    // This will now send a more specific message if validation fails.
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: `Validation Error: ${messages.join(', ')}` });
    }
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Update an existing sponsor
 * @route   PUT /api/sponsors/:id
 * @access  Private
 */
const updateSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logoUrl, description, category } = req.body;

    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      id,
      { name, logoUrl, description, category },
      { new: true, runValidators: true } // Added runValidators to ensure updates are also checked
    );

    if (!updatedSponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }

    res.status(200).json(updatedSponsor);
  } catch (error) {
    // **FIX: Improved Error Handling**
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: `Validation Error: ${messages.join(', ')}` });
    }
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Delete a sponsor
 * @route   DELETE /api/sponsors/:id
 * @access  Private
 */
const deleteSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSponsor = await Sponsor.findByIdAndDelete(id);

    if (!deletedSponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }

    res.status(200).json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update the order of multiple sponsors
 * @route   PUT /api/sponsors/order
 * @access  Private
 */
const updateSponsorOrder = async (req, res) => {
  try {
    const sponsorsToUpdate = req.body;
    const updatePromises = sponsorsToUpdate.map(sponsor =>
      Sponsor.findByIdAndUpdate(sponsor._id, { order: sponsor.order })
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Sponsor order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  updateSponsorOrder,
};
