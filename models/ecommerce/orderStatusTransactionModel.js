const mongoose = require("mongoose");

const orderStatusTransactionSchema = new mongoose.Schema(
  {
    getInvoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servicePurchase",
      index: true
    },
    servicePurchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servicePurchase",
      index: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pickupPoint_Order",
      index: true
    },
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase",
      index: true
    },
    pickupPoints: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pickup_points",
      index: true
    },
    pickupPointManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
      index: true
    },
    deliver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveries",
      index: true
    },
    orderStatusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderStatusMaster",
      require: true,
      index: true
    },
    Note: { type: String },
    staffid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
      index: true
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "orderStatus_Transaction",
  orderStatusTransactionSchema
);
