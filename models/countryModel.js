const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    // country_id: { type: Number, required: true, unique: true, index: true },
    country_name: { type: String },
    regionid: { type: mongoose.Schema.Types.ObjectId, ref: 'Region'}
},
{
    timestamps: true,
})

module.exports = mongoose.model('Country', countrySchema)