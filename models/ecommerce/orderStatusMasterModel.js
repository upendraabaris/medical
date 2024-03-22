const mongoose = require("mongoose");

const orderStatusMasterSchema = new mongoose.Schema(
  {
    orderStatusName: { type: String, require: true },
    active: { type: Boolean, require: true },
    deliveryBoyActive: { type: Boolean, require: true, default: false },
    Sno: { type: Number, default: 2 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderStatusMaster", orderStatusMasterSchema);
