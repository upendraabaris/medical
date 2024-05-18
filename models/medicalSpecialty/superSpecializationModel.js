const mongoose = require('mongoose')

const superSpecializationSchema = new mongoose.Schema({
  super_specialization: { type: String, required: true },
  medicalSpecialtyId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty', required: true, index:true },
  subSpecialityId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSpeciality', required: true, index: true }]
},
{
  timestamps: true,
})

module.exports = mongoose.model('SuperSpecialization', superSpecializationSchema)

// const mongoose = require('mongoose')

// const superSpecializationSchema = new mongoose.Schema({
//   super_specialization: { type: String, required: true },
// },
// {
//   timestamps: true,
// })

// module.exports = mongoose.model('SuperSpecialization', superSpecializationSchema)