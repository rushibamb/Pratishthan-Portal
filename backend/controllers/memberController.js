const Member = require('../models/Member');

/**
 * @desc    Get all members, with optional filtering
 * @route   GET /api/members
 * @access  Public
 */
const getAllMembers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured !== undefined) {
      filter.isFeatured = req.query.featured === 'true';
    }
    const members = await Member.find(filter).sort({ order: 'asc' });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Create a new member
 * @route   POST /api/members
 * @access  Private
 */
const createMember = async (req, res) => {
  try {
    const { name, isFeatured, designation, imageUrl, phone, email } = req.body;

    if (!name || !name.english || !name.marathi) {
      return res.status(400).json({ message: 'Validation Error: Name is required.' });
    }

    const newMemberData = {
      name,
      isFeatured,
      imageUrl,
      phone,
      email,
    };

    if (isFeatured) {
      if (!designation || !imageUrl) {
        return res.status(400).json({ message: 'Validation Error: Featured members require designation and image.' });
      }
      newMemberData.designation = designation;
      const lastMember = await Member.findOne({ isFeatured: true }).sort({ order: -1 });
      newMemberData.order = lastMember ? lastMember.order + 1 : 0;
    }

    const member = new Member(newMemberData);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({ message: `Validation Error: ${messages}` });
    }
    console.error("Error in createMember:", error);
    res.status(500).json({ message: 'An unexpected server error occurred.' });
  }
};

/**
 * @desc    Update an existing member
 * @route   PUT /api/members/:id
 * @access  Private
 */
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isFeatured, designation, imageUrl, phone, email } = req.body;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // **FIX: Explicitly update all fields from the request body**
    member.name = name;
    member.isFeatured = isFeatured;
    member.imageUrl = imageUrl;
    member.phone = phone; // This was missing
    member.email = email; // This was missing

    if (isFeatured) {
      member.designation = designation;
    } else {
      member.designation = undefined;
    }

    const updatedMember = await member.save();
    res.status(200).json(updatedMember);

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({ message: `Validation Error: ${messages}` });
    }
    console.error("Error in updateMember:", error);
    res.status(500).json({ message: 'An unexpected server error occurred.' });
  }
};

// ... (deleteMember and updateMemberOrder functions remain the same)
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateMemberOrder = async (req, res) => {
  try {
    const membersToUpdate = req.body;
    const updatePromises = membersToUpdate.map(member =>
      Member.findByIdAndUpdate(member._id, { order: member.order })
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Member order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  updateMemberOrder,
};
