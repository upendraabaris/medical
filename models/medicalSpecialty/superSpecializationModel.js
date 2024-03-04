const mongoose = require('mongoose')

const superSpecializationSchema = new mongoose.Schema({
  // super_specialization_id: { type: Number, required: true, unique: true },
  super_specialization: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('SuperSpecialization', superSpecializationSchema)
