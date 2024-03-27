// const mongoose = require('mongoose')

// const superSpecializationSchema = new mongoose.Schema({
//   // super_specialization_id: { type: Number, required: true, unique: true },
//   super_specialization: { type: String, required: true },
//   medicalSpecialtyId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty', required: true }
// },
// {
//   timestamps: true,
// })

// module.exports = mongoose.model('SuperSpecialization', superSpecializationSchema)

const mongoose = require('mongoose')

const superSpecializationSchema = new mongoose.Schema({
  super_specialization: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('SuperSpecialization', superSpecializationSchema)