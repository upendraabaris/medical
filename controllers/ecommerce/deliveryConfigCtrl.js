const deliveryConfig = require("../models/deliveryConfigModel");
const asyncHandler = require("express-async-handler");

const getdeliveryConfigList = asyncHandler(async (req, res) => {
  try {
    const alldeliveryConfigs = await deliveryConfig.find();
    return res.json(alldeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getdeliveryConfigsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getadeliveryConfigs = await deliveryConfig.findById(id);
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getPaymentdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "648459530e614e1044f769f8";
  try {
    const getadeliveryConfigs = await deliveryConfig.findById(id);
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePaymentdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "648459530e614e1044f769f8";
  try {
    const getadeliveryConfigs = await deliveryConfig.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getNotificationdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "648459ba3a6b92fb3cb2cf06";
  try {
    const getadeliveryConfigs = await deliveryConfig.findById(id);
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const updateNotificationdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "648459ba3a6b92fb3cb2cf06";
  try {
    const getadeliveryConfigs = await deliveryConfig.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getPickupdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "64845a0a73e767bb62decf95";
  try {
    const getadeliveryConfigs = await deliveryConfig.findById(id);
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePickupdeliveryConfigsById = asyncHandler(async (req, res) => {
  const id = "64845a0a73e767bb62decf95";
  try {
    const getadeliveryConfigs = await deliveryConfig.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.json(getadeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const createdeliveryConfigs = asyncHandler(async (req, res) => {
  try {
    const deliveryConfigs = await deliveryConfig.create(req.body);
    return res.json(deliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedeliveryConfigs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateddeliveryConfigs = await deliveryConfig.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.json(updateddeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});
const deletedeliveryConfigs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deleteddeliveryConfigs = await deliveryConfig.findByIdAndDelete(id);
    return res.json(deleteddeliveryConfigs);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchdeliveryConfig = asyncHandler(async (req, res) => {
  try {
    const getSearcheddeliveryConfig = await deliveryConfig.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    return res.json(getSearcheddeliveryConfig);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createdeliveryConfigs,
  updatedeliveryConfigs,
  deletedeliveryConfigs,
  getdeliveryConfigList,
  getdeliveryConfigsById,
  getSearchdeliveryConfig,
  getNotificationdeliveryConfigsById,
  updateNotificationdeliveryConfigsById,
  getPaymentdeliveryConfigsById,
  updatePaymentdeliveryConfigsById,
  getPickupdeliveryConfigsById,
  updatePickupdeliveryConfigsById,
};
