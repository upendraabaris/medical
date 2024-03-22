const orderConfig = require("../models/orderConfigModel");
const asyncHandler = require("express-async-handler");

const getorderConfigList = asyncHandler(async (req, res) => {
  try {
    const allorderConfigs = await orderConfig.find();
    res.json(allorderConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getorderConfigsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaorderConfigs = await orderConfig.findById(id);
    res.json(getaorderConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const createorderConfigs = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const orderConfigs = await orderConfig.create(req.body);
    res.json(orderConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const updateorderConfigs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedorderConfigs = await orderConfig.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedorderConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteorderConfigs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedorderConfigs = await orderConfigs.findByIdAndDelete(id);
    res.json(deletedorderConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createorderConfigs,
  updateorderConfigs,
  deleteorderConfigs,
  getorderConfigList,
  getorderConfigsById,
};
