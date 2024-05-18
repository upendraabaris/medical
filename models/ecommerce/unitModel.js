const mongoose = require("mongoose")

const unitSchema = new mongoose.Schema({
    unit: { type: String }
})

module.exports = mongoose.model('Unit', unitSchema) 