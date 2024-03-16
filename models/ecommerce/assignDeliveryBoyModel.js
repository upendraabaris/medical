const mongoose = require("mongoose");

const assignOrderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    deliveryBoy: { type: mongoose.Schema.Types.ObjectId, ref: "deliveryBoy" },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true },
    status: {
      type: String,
      enum: ["Rejected", "Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    approve: { type: Boolean, default: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

assignOrderSchema.pre("update", function (next) {
  if (!this.approve) {
    this.status = "Rejected";
  }
});

module.exports = mongoose.model("assignDeliveryBoyOrder", assignOrderSchema);
