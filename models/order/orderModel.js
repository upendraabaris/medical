const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    order_id: { type: Number, required: true, unique: true, index: true },
    service_id: { type: Number, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductMaster' },
    parent_order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderMaster' },
    // bookedBy: { type: Number, required: true, ref: 'UserMaster' },
    // bookedFor: { type: Number, required: true, ref: 'UserMaster' },
    // allocatedTo: { type: Number, required: true, ref: 'UserMaster' },
    service_booking_date_time: { type: Date, required: true },
    service_allocation_date_time: { type: Date },
    srvice_delivered_date_time: { type: Date },
    service_comments: { type: String },
    order_status_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'OrderStatusMaster' }
},
{
    timestamps: true,
})

module.exports = mongoose.model("Order", orderSchema)