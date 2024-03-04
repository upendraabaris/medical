const mongoose = require("mongoose")

const serviceHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    ppNumber: { type: String, required: true },
    full_name: { type: String, required: true },
    doctor_name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
    doctor_response: { type: String },
},
{
    timestamps: true
})

module.exports = mongoose.model('ServiceHistory', serviceHistorySchema)
