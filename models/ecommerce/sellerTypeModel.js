const mongoose = require('mongoose')

const sellerTypeSchema = new mongoose.Schema({
  // id: { type: String },
  seller_type: { type: String, required: true },
  category: { type: String, enum: ['Individual', 'Institutional']}
},
{
  timestamps: true,
})

module.exports = mongoose.model('SellerType', sellerTypeSchema)
