const mongoose = require('mongoose');

const sellerEngagementMappingSchema = new mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sellers', // Assuming there is a Seller model to refer to
    required: true
  },
  engagementType: {
    type: String,
    // enum: ['Payout basis', 'Incentives basis', 'Discounts basis', 'Service charges basis'],
    required: true
  },
  mode: {
    type: String,
    // enum: ['Inward', 'Outward'],
    required: true
  },
  businessTarget: {
    type: [String],
    // enum: ['Indian', 'Foreigners'],
    required: true
  },
  serviceChargesIndian: {
    type: Number,
  },
  serviceChargesIndianCorporate: {
    type: Number,
  },
  serviceChargesNRIsPIOs: {
    type: Number,
  },
  serviceChargesForeignExpatsDiplomats: {
    type: Number,
    required: true
  },
  serviceChargesForeignersWithIndianRates: {
    type: Number,
    required: true
  },
  serviceChargesForeigners: {
    type: Number,
    required: true
  },

  payoutIndian: {
    type: Number,
    required: true,
  },
  payoutIndianCorporate: {
    type: Number,
    required: true
  },
  payoutNRIsPIOs: {
    type: Number,
    required: true
  },
  payoutForeignExpatsDiplomats: {
    type: Number,
    required: true
  },
  payoutForeignersWithIndianRates: {
    type: Number,
    required: true
  },
  payoutForeigners: {
    type: Number,
    required: true
  },

  opdConsultation: {
    type: Number,
    required: true,
    alias: 'discountsOPDConsultation'
  },
  treatmentPackages: {
    type: Number,
    required: true,
    alias: 'discountsTreatmentPackages'
  },
  electiveSurgeriesIPServ: {
    type: Number,
    required: true,
    alias: 'discountsElectiveSurgeriesIPServ'
  },
  medicines: {
    type: Number,
    required: true,
    alias: 'discountsMedicines'
  },
  pathologyInvestigation: {
    type: Number,
    required: true,
    alias: 'discountsPathologyInvestigation'
  },

  fixedIncentiveUserAcquisition: {
    type: Number,
    required: true,
    alias: 'fixedIncentivePerUserAcquisition'
  },
  fixedIncentiveClientAcquisition: {
    type: Number,
    required: true,
    alias: 'fixedIncentivePerClientAcquisition'
  },
  incentivesUserBusiness: {
    type: Number,
    required: true,
    alias: 'incentivesPerUserBusiness'
  },
  incentivesClientBusiness: {
    type: Number,
    required: true,
    alias: 'incentivesPerClientBusiness'
  },
  calculationOn: {
    type: String,
    // enum: ['Gross invoice value', 'Net Invoice value (Gross - Consumables, Margins)'],
    required: true
  },
  rule: { type: String },
  uploadEngagementLetter: { type: String },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff'}   //RelationShip Manager
},{
  timestamps: true
});

module.exports = mongoose.model('SellerEngagementMapping', sellerEngagementMappingSchema);
