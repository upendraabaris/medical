const mongoose = require('mongoose');

const orderResponseTypeSchema = new mongoose.Schema({
    // order_response_type_id: { ype: Number, required: true, unique: true, index: true },
    // order_response_type: { type: String, required: true } //sir se puchna hai ki yha pe order_response_type_id yaaaa order_response_type ye aayega
},
{
    timestamps: true,
})

module.exports = mongoose.model('OrderResponseType', orderResponseTypeSchema);
