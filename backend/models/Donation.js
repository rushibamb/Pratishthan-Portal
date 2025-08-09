const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Donation for Vergani'
    },
    description: {
      english: {
        type: String,
        required: true,
        default: 'Support our cause by making a donation'
      },
      marathi: {
        type: String,
        required: true,
        default: 'आमच्या कार्यासाठी दान करा'
      }
    },
    qrCodeUrl: {
      type: String,
      required: false
    },
    bankDetails: {
      accountName: {
        type: String,
        required: false
      },
      accountNumber: {
        type: String,
        required: false
      },
      ifscCode: {
        type: String,
        required: false
      },
      bankName: {
        type: String,
        required: false
      },
      branch: {
        type: String,
        required: false
      }
    },
    upiId: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', DonationSchema);
