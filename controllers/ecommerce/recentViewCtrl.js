const asyncHandler = require("express-async-handler");
const Recent = require("../models/recentModel");
const Product = require("../models/productModel");

const listRecentView = asyncHandler(async (req, res) => {
  try {
    const recents = await Recent.find({ userid: req.params.id })
      .sort({ createdAt: -1 })
      .distinct("productId");
    const products = await Product.find({ _id: { $in: recents } });
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  listRecentView,
};
