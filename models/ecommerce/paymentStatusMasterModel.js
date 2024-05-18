const mongoose = require("mongoose");

const paymentStatusMasterSchema = new mongoose.Schema(
  {
    paymentStatusName: { type: String, require: true },
    active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("paymentStatusMaster", paymentStatusMasterSchema);