const mongoose = require("mongoose");

const productStockSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      require: true,
    },
    variant: { type: String, require: true },
    pickupPoints: { type: mongoose.Schema.Types.ObjectId, ref: "pickup_point" },
    sku: { type: String },
    qty: { type: Number, default: 0 },
    image: String,
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    overSelling: { type: Boolean, default: true },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
  },
  {
    timestamps: true,
  }
);

productStockSchema.pre("save", async function (next) {});

module.exports = mongoose.model("product_stock", productStockSchema);
