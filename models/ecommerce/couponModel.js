const mongoose = require("mongoose");

const couponsSchema = mongoose.Schema(
  {
    type: String,
    code: { type: String },
    details: {
      product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      category: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    },
    description: { type: String },

    icon: {
      public_id: { type: String },
      url: { type: String }
    },

    discount: Number,
    discount_type: String,
    start_date: Date,
    end_date: Date,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    expiry: String,
    currency_id: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },

    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accCompany",index: true
    },
  },
  {
    timestamps: true,
  }
);

couponsSchema.index({ code: "text" });

module.exports = mongoose.model("coupons", couponsSchema);
