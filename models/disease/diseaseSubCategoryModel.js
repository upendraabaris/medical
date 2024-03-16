const mongoose = require("mongoose")

const diseaseSubCategorySchema = new mongoose.Schema({
    // diseasesubcategoryid: { type: Number, required: true, unique: true },
    disease_category_id: { type: Number, required: true, ref: 'DiseaseCategory' },
    disease_subcategory: { type: String, required: true },
})
  
module.exports = mongoose.model('DiseaseSubCategory', diseaseSubCategorySchema)