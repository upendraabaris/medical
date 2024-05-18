const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PackageType',
    required: true,
  },
  packageCategory: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  packagePriceUSD: {
    type: Number,
    required: true,
  },
  packagePriceINR: {
    type: Number,
    required: true,
  },
  offerPriceUSD: {
    type: Number,
  },
  offerPriceINR: {
    type: Number,
  },
  validityFrom: {
    type: Date,
    required: true,
  },
  validUpto: {
    type: Date,
    required: true,
  },
  partnerFacilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sellers',
  },
  applicability: {
    type: String,
    enum: ['Only Indian', 'Only Foreign Nationals', 'Both', 'Only Nearby Population'],
    required: true,
  },
  bookingAmount: {
    type: Number,
  },
  callbackNumber: {
    type: String,
  },
  representativeName: {
    type: String,
  },
  packagePosters: {
    type: [String], // Array of strings to store image URLs
  },
  packageBrochure: {
    type: String, // URL for the PDF brochure
  },
  is_active: { type: Boolean, default: false}
});

module.exports = mongoose.model('Package', packageSchema);
