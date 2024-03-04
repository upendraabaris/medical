const mongoose = require('mongoose');

const hospitalClinicTypeSchema = new mongoose.Schema({
  // hos_clinic_type_id: { type: Number, required: true },
  hos_clinic_type: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('HospitalClinicType', hospitalClinicTypeSchema);