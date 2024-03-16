const mongoose = require("mongoose");

const cancelReasonSchema = new mongoose.Schema(
  {
    reason: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cancelReason", cancelReasonSchema);
