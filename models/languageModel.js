const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: {type: String},
    code: {type: String},
    country_id: { type: mongoose.Schema.Types.ObjectId, ref:'Country', default: null }
})

module.exports = mongoose.model('language', languageSchema)
