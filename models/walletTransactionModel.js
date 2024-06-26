const mongoose = require("mongoose");
const WalletTransactionMaster = require("./walletTransactionMasterModel");
// const User = require("./userModel");
// const Transaction = require("./walletTransactionModel");
// const ContestParticipate = require("./contestParticipateModel");

const transactionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index:true },
    amount: Number,
    currency: { type: String },
    payment_method: String,
    payment_details: {},
    approval: { type: Boolean, default: false, index: true },
    offline_payment: { type: Boolean, default: false },
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
    reciept: String,
    note: { type: String },
    trans_type: {
      type: String,
      enum: ["Added", "Payment", "Wallet", "Deduct"],
      require: true,
    },
    trans_category: { type: String, enum: ['Medical Consultancy Booking'], index: true},
    order_id: { type: String, index: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order1', index: true}
  },
  {
    timestamps: true,
    strict: false
  }
);

transactionSchema.pre("save", async function (next) {
  let sequence = await WalletTransactionMaster.findById(
    "660c20653c9e0f77cd1e0e61"
  );
  this.order_id = "MCS-" + sequence.sequence;
  sequence.sequence += 1;
  await sequence.save();
 next();
});

module.exports = mongoose.model("transactionWallet", transactionSchema);
