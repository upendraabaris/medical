const mongoose = require('mongoose')

const businessPartnerSchema = new mongoose.Schema({
    business_partner_id: { type: Number, required: true, unique: true, index: true },
    business_partner_name: { type: String, required: true },
    engagement_letter: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('BusinessPartner', businessPartnerSchema)
