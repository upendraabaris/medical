const mongoose = require("mongoose");

const cancelOrderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    reason: { type: mongoose.Schema.Types.ObjectId, ref: "cancelReason" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true },
    approve: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cancelOrder", cancelOrderSchema);
