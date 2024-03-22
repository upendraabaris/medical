const mongoose = require("mongoose");

const productCostVariationSchema = new mongoose.Schema({
  sku: { type: String },
  sale_rate: { type: Number, default: 0 },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_test",
    require: true,
    index: true
  },
  variant_id: { type: String, require: true, index: true },
  currency_id: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: "countryMaster", index: true },
  accCompany_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountCompany",
    index: true
  },
  pickupPoints: { type: mongoose.Schema.Types.ObjectId, ref: "pickup_point" },
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers", index: true },
  price: { type: Number, require: true, default: 0 },
  unit_price: { type: Number, require: true, default: 0 },
  isActive: { type: Boolean, default: true },
  current_qty: { type: Number, default: 0 },
  discount_type: { type: String, default: "Inclusive" },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  tax_type: { type: String, default: "Inclusive" },
  purchase_rate: { type: Number, default: 0 },
  mrp: { type: Number, default: 0 },
  showRoom_rate: { type: Number, default: 0 },
  wholeSale_rate: { type: Number, default: 0 },
  landing_rate: { type: Number, default: 0 },
  hsn_code: { type: String },
  sale_rp: { type: String },
  share_rp: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model(
  "productCostVariation",
  productCostVariationSchema
);
