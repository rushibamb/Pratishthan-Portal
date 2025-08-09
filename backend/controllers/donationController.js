const Donation = require('../models/Donation');

/**
 * @desc    Get donation information
 * @route   GET /api/donations
 * @access  Public
 */
const getDonationInfo = async (req, res) => {
  try {
    let donation = await Donation.findOne({ isActive: true });
    
    if (!donation) {
      // Create default donation info if none exists
      donation = await Donation.create({
        title: 'Donation for Vergani',
        description: {
          english: 'Support our cause by making a donation',
          marathi: 'आमच्या कार्यासाठी दान करा'
        }
      });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update donation information
 * @route   PUT /api/donations
 * @access  Private
 */
const updateDonationInfo = async (req, res) => {
  try {
    const {
      title,
      description,
      qrCodeUrl,
      bankDetails,
      upiId,
      isActive
    } = req.body;

    let donation = await Donation.findOne({ isActive: true });
    
    if (!donation) {
      donation = new Donation();
    }

    // Update fields
    if (title) donation.title = title;
    if (description) donation.description = description;
    if (qrCodeUrl !== undefined) donation.qrCodeUrl = qrCodeUrl;
    if (bankDetails) donation.bankDetails = bankDetails;
    if (upiId !== undefined) donation.upiId = upiId;
    if (isActive !== undefined) donation.isActive = isActive;

    await donation.save();

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create new donation information
 * @route   POST /api/donations
 * @access  Private
 */
const createDonationInfo = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getDonationInfo,
  updateDonationInfo,
  createDonationInfo,
};
