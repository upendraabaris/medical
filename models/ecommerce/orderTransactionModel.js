const mongoose = require("mongoose");

const orderTransactionSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pickupPoint_Order",
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceinvoice",
    },
    referenceNo: { type: String },
    paymentMethod: { type: String, enum: ["cheque", "credit", "cash"] },
    checkNo: { type: String },
    paymentDetails: {},
    Amount: { type: Number, default: 0 },
    status: { type: String, enum: ["Pending", "Success"] },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },
    type: { type: String, enum: ["Received", "Sent"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderTransaction", orderTransactionSchema);
