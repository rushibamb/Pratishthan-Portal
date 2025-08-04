const mongoose = require('mongoose');

// Define the schema for our page content.
const PageContentSchema = new mongoose.Schema(
  {
    // 'sectionName' will be a unique identifier for each content block,
    // e.g., 'hero', 'aboutStats', 'contactInfo'.
    // This makes it easy to query for the content of a specific section.
    sectionName: {
      type: String,
      required: true,
      unique: true, // Ensures we don't have duplicate sections.
    },
    // 'content' is a flexible field to store the actual data for the section.
    // Using mongoose.Schema.Types.Mixed allows us to store any object structure,
    // for example: { title: '...', subtitle: '...' } for the hero section.
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    // 'timestamps' is a Mongoose option that automatically adds
    // 'createdAt' and 'updatedAt' fields to our documents.
    // This is useful for tracking when content was last modified.
    timestamps: true,
  }
);

// Create and export the Mongoose model.
// The first argument 'PageContent' is the singular name of the collection.
// Mongoose will automatically look for the plural, lowercased version
// in the database (i.e., the 'pagecontents' collection).
module.exports = mongoose.model('PageContent', PageContentSchema);
