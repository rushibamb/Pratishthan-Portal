const ContactMessage = require('../models/ContactMessage');

/**
 * @desc    Create a new contact message (for public form submission)
 * @route   POST /api/messages
 * @access  Public
 */
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'All fields (name, email, message) are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Get all contact messages (for admin panel)
 * @route   GET /api/messages
 * @access  Private
 */
const getAllMessages = async (req, res) => {
  try {
    // Sort by createdAt: -1 to show the newest messages first.
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update a message's status (e.g., mark as read)
 * @route   PUT /api/messages/:id
 * @access  Private
 */
const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
};

/**
 * @desc    Delete a message
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
};
