const mongoose = require("mongoose");

const orderConfigSchema = new mongoose.Schema({
  minimum_order: Boolean,
  set_min_order_amount: Number,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("orderConfig", orderConfigSchema);
