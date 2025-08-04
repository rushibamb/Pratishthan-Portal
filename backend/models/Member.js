const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    name: {
      english: { type: String, required: true },
      marathi: { type: String, required: true },
    },
    designation: {
      english: { 
        type: String,
        required: function() { return this.isFeatured; }
      },
      marathi: { 
        type: String,
        required: function() { return this.isFeatured; }
      },
    },
    imageUrl: {
      type: String,
      required: function() { return this.isFeatured; }
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', MemberSchema);
