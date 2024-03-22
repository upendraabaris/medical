const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: {type: String},
    code: {type: String},
})

module.exports = mongoose.model('language', languageSchema)
