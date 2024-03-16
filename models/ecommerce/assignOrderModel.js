const mongoose = require("mongoose");

const assignOrderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: 'accCompany' },
    pickupPoints: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoints" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product_test" },
    variant: { type: String },
    sku: { type: String },
    qty: { type: Number },
    approve: { type: Boolean, default: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("assignOrder", assignOrderSchema);
