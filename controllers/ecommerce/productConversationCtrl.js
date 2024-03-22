const productConversation = require("../models/productConversationModel");
const asyncHandler = require("express-async-handler");

const getproductConversationList = asyncHandler(async (req, res) => {
  try {
    const allproductConversations = await productConversation.find();
    res.json(allproductConversations);
  } catch (error) {
    throw new Error(error);
  }
});

const getproductConversationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaproductConversation = await productConversation.findById(id);
    res.json(getaproductConversation);
  } catch (error) {
    throw new Error(error);
  }
});

const createproductConversation = asyncHandler(async (req, res) => {
  try {
    const productConversation = await productConversation.create(req.body);
    res.json(productConversation);
  } catch (error) {
    throw new Error(error);
  }
});
const updateproductConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedproductConversation =
      await productConversation.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.json(updatedproductConversation);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteproductConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedproductConversation =
      await productConversation.findByIdAndDelete(id);
    res.json(deletedproductConversation);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getproductConversationList,
  getproductConversationById,
  createproductConversation,
  updateproductConversation,
  deleteproductConversation,
};
