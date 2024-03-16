const mongoose = require("mongoose")


const diseaseSchema = new mongoose.Schema({
    // diseaseid: { type: Number, required: true, unique: true },
    disease_category_id: { type: Number, required: true, ref: 'DiseaseCategory' },
    disease_subcategory_id: { type: Number, required: true, ref: 'DiseaseSubCategory' },
    region_id: { type: Number, required: true, ref: 'Region' },
    disease_name: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
})

module.exports = mongoose.model("disease", diseaseSchema)