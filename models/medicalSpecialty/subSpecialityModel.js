const mongoose = require('mongoose')

const subSpecialitySchema = new mongoose.Schema({
  // super_specialization_id: { type: Number, required: true, unique: true },
  sub_speciality: { type: String, required: true },
  medicalSpecialtyId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty', required: true }]
},
{
  timestamps: true,
})

module.exports = mongoose.model('SubSpeciality', subSpecialitySchema)