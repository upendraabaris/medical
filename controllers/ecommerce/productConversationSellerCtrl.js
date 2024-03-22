const productConversationSeller = require("../models/productConversationModel");
const asyncHandler = require("express-async-handler");

const getproductConversationSellerList = asyncHandler(async (req, res) => {
  try {
    const allproductConversationSellers =
      await productConversationSeller.find();
    res.json(allproductConversationSellers);
  } catch (error) {
    throw new Error(error);
  }
});

const getproductConversationSellerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaproductConversationSeller =
      await productConversationSeller.findById(id);
    res.json(getaproductConversationSeller);
  } catch (error) {
    throw new Error(error);
  }
});

const createproductConversationSeller = asyncHandler(async (req, res) => {
  try {
    const productConversationSeller = await productConversationSeller.create(
      req.body
    );
    res.json(productConversationSeller);
  } catch (error) {
    throw new Error(error);
  }
});
const updateproductConversationSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedproductConversationSeller =
      await productConversationSeller.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.json(updatedproductConversationSeller);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteproductConversationSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedproductConversationSeller =
      await productConversationSeller.findByIdAndDelete(id);
    res.json(deletedproductConversationSeller);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getproductConversationSellerList,
  getproductConversationSellerById,
  createproductConversationSeller,
  updateproductConversationSeller,
  deleteproductConversationSeller,
};
