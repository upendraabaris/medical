const mongoose = require("mongoose")

const diseaseCategorySchema = new mongoose.Schema({
   disease_category: { type: String, enum: ["Communicable Disease", "Non Communicable Disease"] }
})

module.exports = mongoose.model("DiseaseCategory", diseaseCategorySchema)