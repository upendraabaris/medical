const mongoose = require("mongoose")

const legalStatusSchema = new mongoose.Schema({
        legal_status_id: { type: Number, required: true, unique: true },
        legal_status: { type: String, required: true }
},
{
        timestamps: true,
})

module.exports = mongoose.model('legalStatus', legalStatusSchema)