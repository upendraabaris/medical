const mongoose = require('mongoose')

const awardSchema = new mongoose.Schema({
  // award_id: { type: Number, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hos_clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HospitalClinic', required: true },
  award_title: { type: String, required: true },
  date: { type: Date },
  awarding_body: { type: String },
  special_notes: { type: String },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Award', awardSchema)
