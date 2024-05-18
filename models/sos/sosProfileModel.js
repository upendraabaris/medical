const mongoose = require('mongoose');

const sosProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  treatingDoctorName: {
    type: String,
    // required: true,
  },
  treatingDoctorNumber: {
    type: String,
  },
  prescriptionImage: {
    type: String,
  },
  dischargeSummaryImage: {
    type: String,
  },
  insurerName: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  insuranceCoverPageImage: {
    type: String,
  },
  reminderNeeded: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('SOS_Profile_Master', sosProfileSchema);
