const mongoose = require('mongoose')

const medicineTypeSchema = new mongoose.Schema({
  // medicine_type_id: { type: Number, required: true, unique: true },
  medicine_type: { type: String, required: true }
},
{
  timestamps: true,
})

module.exports = mongoose.model('MedicineType', medicineTypeSchema)
