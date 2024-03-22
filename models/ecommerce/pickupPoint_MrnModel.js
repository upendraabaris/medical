const mongoose = require("mongoose");

const pickupPoint_mrnSchema = new mongoose.Schema(
  {
    sequence: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pickupStockSequence", pickupPoint_mrnSchema);
