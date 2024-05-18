const mongoose = require("mongoose")

const admissionTypeSchema = new mongoose.Schema({
    admission_type: { type: String }
})

module.exports = mongoose.model('admissionType', admissionTypeSchema)