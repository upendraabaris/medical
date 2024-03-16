const mongoose = require("mongoose");

const cancelDeliveryOrderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    reason: { type: mongoose.Schema.Types.ObjectId, ref: "cancelReason" },
    deliveryBoy: { type: mongoose.Schema.Types.ObjectId, ref: "deliveryBoy" },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
    approve: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "cancelDeliveryOrder",
  cancelDeliveryOrderSchema
);
