const mongoose = require("mongoose")

const sosTransactionSchema = new mongoose.Schema({
    sos_transaction_id: { type: Number, required: true, unique: true },
    sos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SOSMaster', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMaster', required: true },
    datetime: { type: Date },
    geocordinates: { type: String, required: true } //system generated
},
{
    timestamps: true,
})

module.exports = mongoose.model('SOSTransaction', sosTransactionSchema);
