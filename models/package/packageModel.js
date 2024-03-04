const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: [
    {
      language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages" },
      name: { type: String },
    },
  ],
  Currency_id: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },
  uid: { type: String },
  sale_price: { type: Number },
  commission: { type: Number },
  minProductPrice: { type: Number },
  maxProductPrice: { type: Number },
  referalRewards: { type: Number },
  dailySpin: { type: Number },
  coinsOnSpin: { type: Number },
  quick_coins: { type: Number },
  withdrawAmount: { type: Number },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("package", packageSchema);
