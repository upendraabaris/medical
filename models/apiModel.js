const mongoose = require('mongoose')

const apiMasterSchema = new mongoose.Schema({
    api_id: { type: Number, required: true, unique: true, index: true },
    business_partner_id: { type: Number, required: true, ref: 'BusinessPartner' },
    api_url: {type: String,  required: true },
    description: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('ApiMaster', apiMasterSchema)
