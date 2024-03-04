const mongoose = require("mongoose");
const Package = require("./packageModel");

const packagePaymentHistorySchema = new mongoose.Schema(
  {
    name: { type: String },
    duration: { type: Number },
    packageType: { type: String },
    status: { type: Boolean, default: false },
    price: { type: Number },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
    },
    transType: { type: String, enum: ["cheque", "paymentGateway"] },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transactionWallet",
    },
    photo: {
      public_id: { type: String },
      url: { type: String },
    },
/*     status: {
      type: String,
      enum: ["Pending", "Rejected", "Accepted"],
      default: "Pending",
    },
 */  },
  {
    timestamps: true,
  }
);

packagePaymentHistorySchema.pre("save", async function (next) {
  if (this.packageType == "offline") {
    this.status = false;
  }
  let pack = await Package.findById(this.package_id);
  next();
});

module.exports = mongoose.model(
  "packagePaymentHistory",
  packagePaymentHistorySchema
);
