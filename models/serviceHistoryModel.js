const mongoose = require("mongoose")

const serviceHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    ppNumber: { type: String, required: true },
    full_name: { type: String, required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref:'seller'},
    doctor_name: { type: String, required: true },
    amount: { type: Number, default: 0 },
    txn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'transactionWallet', unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
    doctor_response: { type: String },
},
{
    timestamps: true
})

module.exports = mongoose.model('ServiceHistory', serviceHistorySchema)
