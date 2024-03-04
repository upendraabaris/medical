const mongoose = require('mongoose')

const emrResponseSchema = new mongoose.Schema({
    emr_response_id: { type: Number, required: true, unique: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderMaster', required: true },
    emr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EMRMaster', required: true },
    emr_option_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EMROptionMaster', required: true },
})

module.exports = mongoose.model('EMRResponse', emrResponseSchema);