// const mongoose = require('mongoose');

// const medicalSpecialtySchema = new mongoose.Schema({
//   // medical_specialty_id: { type: Number, required: true, unique: true },
//   medical_specialty: { type: String, required: true },
//   medical_specialty_icon: { type: String }
// },
// {
//   timestamps: true,
// })

// module.exports = mongoose.model('MedicalSpecialty', medicalSpecialtySchema)


const mongoose = require('mongoose');

const medicalSpecialtySchema = new mongoose.Schema({
  superSpecialty: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperSpecialization', required: true },
  name: { type: String }
},
{
  timestamps: true,
})

module.exports = mongoose.model('MedicalSpecialty', medicalSpecialtySchema)