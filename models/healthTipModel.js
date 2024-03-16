const mongoose = require("mongoose")

const healthTipSchema = new mongoose.Schema({
    // healthtipid: { type: Number, required: true, unique: true },
    healthtipENG: { type: String, required: true },
    healthtipHINDI: { type: String, required: true },
    specialityid: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty' },
    diseaseid: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease' },
})

module.exports = mongoose.model("healthTip", healthTipSchema)