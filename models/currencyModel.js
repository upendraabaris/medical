const mongoose = require("mongoose")

const currencySchema = new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', index: true},
    currency_name: { type: String, required: true },
    currency_code: { type: String },
    currency_symbol: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('currency', currencySchema)