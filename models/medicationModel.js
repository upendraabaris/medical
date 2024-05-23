const mongoose = require("mongoose")

const medicationSchema = new mongoose.Schema({
    category: { type: String },
    medication_name: { type: String }
},{
    timestamps: true
})

module.exports = mongoose.model("MedicationMaster",medicationSchema)