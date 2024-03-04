const mongoose = require("mongoose")

const currencySchema = new mongoose.Schema({
    currency_name: { type: String },
    currency_code: { type: String },
    currency_symbol: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('currency', currencySchema)