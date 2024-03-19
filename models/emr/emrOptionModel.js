const mongoose = require('mongoose')

const emrOptionSchema = new mongoose.Schema({
    //emr_option_id: { type: Number, required: true, unique: true },
    emr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EMRMaster', required: true },
    emr_option_text: { type: String, required: true },
})

module.exports = mongoose.model('EMROptionMaster', emrOptionSchema)
