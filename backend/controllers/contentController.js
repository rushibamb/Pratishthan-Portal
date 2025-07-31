const PageContent = require('../models/PageContent');

/**
 * @desc    Get content for a specific page section
 * @route   GET /api/content/:sectionName
 * @access  Public
 */
const getPageContent = async (req, res) => {
  try {
    const { sectionName } = req.params;
    let content = await PageContent.findOne({ sectionName });

    if (!content) {
      let defaultContent = {};
      if (sectionName === 'hero') {
        // UPDATED: Default content now includes multilingual fields
        defaultContent = {
          heading: { english: 'Default Welcome (EN)', marathi: 'Default Welcome (MR)' },
          subtitle: { english: 'Default subtitle (EN)', marathi: 'Default subtitle (MR)' },
          imageUrl: 'https://placehold.co/1920x1080/f97316/ffffff?text=Placeholder+Image',
        };
      }
      if (sectionName === 'about') {
        defaultContent = {
          imageUrl: 'https://placehold.co/800x600/fbbf24/ffffff?text=Placeholder',
          statYears: '39',
          statDevotees: '50K+',
          statVolunteers: '200+',
          statInitiatives: '15+',
        };
      }

      content = await PageContent.create({
        sectionName,
        content: defaultContent,
      });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update content for a specific page section
 * @route   PUT /api/content/:sectionName
 * @access  Private (will be protected later)
 */
const updatePageContent = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const newContent = req.body;

    const updatedContent = await PageContent.findOneAndUpdate(
      { sectionName },
      { content: newContent },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getPageContent,
  updatePageContent,
};
