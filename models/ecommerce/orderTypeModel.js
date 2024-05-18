const mongoose = require('mongoose')

const OrderTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('OrderType', OrderTypeSchema)
