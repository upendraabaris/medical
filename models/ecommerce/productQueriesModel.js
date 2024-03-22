const mongoose = require("mongoose");

const productQueriesSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product_test" },
    note: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
    title: String,
    reply: { type: mongoose.Schema.Types.ObjectId, ref: "productQueries" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("productQueries", productQueriesSchema);
