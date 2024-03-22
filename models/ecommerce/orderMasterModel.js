const mongoose = require("mongoose");

const orderMasterSchema = new mongoose.Schema(
  {
    sequence: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderMaster", orderMasterSchema);
