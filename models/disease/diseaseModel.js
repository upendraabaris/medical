const mongoose = require("mongoose")


const diseaseSchema = new mongoose.Schema({
    // diseaseid: { type: Number,  unique: true },
    disease_category_id: { type: Number,  ref: 'DiseaseCategory' },
    disease_subcategory_id: { type: Number,  ref: 'DiseaseSubCategory' },
    region_id: { type: Number,  ref: 'Region' },
    disease_name: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    medical_speciality_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty'}
})

module.exports = mongoose.model("disease", diseaseSchema)