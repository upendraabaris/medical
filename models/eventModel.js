const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    packageType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PackageType',
        index: true
    },
    eventType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventType',
        index: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isOngoing: {
        type: Boolean,
        default: false
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    venue: {
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        index: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },
    partnerHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        index: true
    },
    partnerDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        index: true
    },
    speciality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalSpecialty',
        index: true
    },
    announcementStartDate: {
        type: Date
    },
    announcementEndDate: {
        type: Date
    },
    isPreBookingAllowed: {
        type: Boolean,
        default: false
    },
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currency',
        index: true
    },
    bookingAmount: {
        type: Number
    },
    callBackNumber: {
        type: String
    },
    representativeName: {
        type: String
    },
    eventPoster: {
        type: String 
    },
    totalSlots: {
        type: Number,
        // required: true
    },
    availableSlots: {
        type: Number,
        default: function() {
          return this.totalSlots;
        },
      },
    is_active: { type: Boolean, default: false}
});

// Virtual field for availableSlots (calculated on retrieval)
// eventSchema.virtual('availableSlots').get(function () {
//     return Math.max(0, this.totalSlots - this.counter); // Ensure non-negative value
//   });
  

module.exports = mongoose.model('Event', eventSchema);

// title: { type: String, required: true },
// description: { type: String },
// event_type: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType' },
// event_location: { type: String },
// country: { type: mongoose.Schema.Types.ObjectId, ref: 'CountryMaster' },
// city: { type: mongoose.Schema.Types.ObjectId, ref: 'CityMaster' },
// start_date: { type: Date },
// end_date: { type: Date },
// start_time: { type: String },
// end_time: { type: String },
// organised_by: { type: String },
// hospital_partner_destination: { type: String },
// hospital_partner_organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
// doctor_partner_host: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
// event_posters: [{ type: String }], // Array of URLs for event posters
// registration_fee_INR: { type: Number },
// registration_fee_local_currency: { type: Number },
// available_slot: { type: Number },
// IsPreBookingAllowed: {type: Boolean, default: false }