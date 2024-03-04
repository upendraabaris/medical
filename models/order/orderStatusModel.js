const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
    order_status_id: { type: Number, required: true, unique: true, index: true },
    // order_status: { type: String, required: true },
    order_status: { type: Boolean, default: false}
},
{
    timestamps: true,
})

module.exports = mongoose.model('OrderStatus', orderStatusSchema);
