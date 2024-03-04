const mongoose = require('mongoose')

const orderResponseSchema = new mongoose.Schema({
  order_response_id: { type: Number, required: true, unique: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  order_response: { type: String },
  order_response_url: { type: String },
  order_response_interpretation_url: { type: String },
},
{
  timestamps: true,
})

module.exports = mongoose.model('OrderResponse', orderResponseSchema);
