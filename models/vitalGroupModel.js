const mongoose = require("mongoose")

const vitalGroupSchema = new mongoose.Schema({
    vitalCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'VitalCategory'},
    name: { type: String }
})

module.exports = mongoose.model('VitalGroup', vitalGroupSchema)