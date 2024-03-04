const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    // country_id: { type: Number, required: true, unique: true, index: true },
    country_name: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Country', countrySchema)