const mongoose = require("mongoose");

const transactionMasterSchema = new mongoose.Schema(
  {
    sequence: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transactionMaster", transactionMasterSchema);
