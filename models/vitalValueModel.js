const mongoose = require('mongoose');

const vitalValueSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
    // required: true
  },
  vital_parameter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'KeyVital'
    // required: true
  },
  testDate:{
    type: Date,
    default: Date.now()
  },
  testTime:{
    type: String,
    // default: Date.now()
  },
  value: {
    type: String,
    // required: true
  },
  leftEyeVision: {
    type: Number,
    // required: true
  },
  rightEyeVision: {
    type: Number,
    // required: true
  },
  overallVision: {
    type: String,
    // required: true
  },
  eyePressure: {
    type: Number,
    // required: true
  },
  reported_by: {
    type: String,
    enum: ["Self", "Family", "Health Facility"],
    // required: true
  },
  // health_facility_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'SellerUser'
  // },
  addedBy: {
    type: String,
    // required: true
  },
  report_image: {
    type: String
  },
  interpretation_image: {
    type: String
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('VitalValue', vitalValueSchema);
