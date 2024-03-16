const mongoose = require('mongoose');

const diseaseSubSchema = new mongoose.Schema({
//   subdiseaseid: { type: Number, required: true, unique: true },
  disease_id: { type: Number, required: true, ref: 'Disease' },
  disease_category_id: { type: Number, required: true, ref: 'DiseaseCategory' },
  disease_subcategory_id: { type: Number, required: true, ref: 'DiseaseSubCategory' },
  disease_name: { type: String, required: true },
  short_description: { type: String, required: true },
  long_description: { type: String, required: true },
})

module.exports = mongoose.model('DiseaseSub', diseaseSubSchema)
