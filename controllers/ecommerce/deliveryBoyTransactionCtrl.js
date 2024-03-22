const User = require("../models/userModel");
const deliveryBoyTransaction = require("../models/deliveryBoyTransactionModels");
const asynchandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const cloudinary = require("../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");
const PickupPoints = require("../models/pickupPointsModel");

const createdeliveryBoyTransaction = asynchandler(async (req, res) => {
  try {
    const getDeliveryBoyTransaction = await deliveryBoyTransaction.create(
      req.body
    );
    res.json(getDeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedeliveryBoyTransaction = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateddeliveryBoyTransaction =
      await deliveryBoyTransaction.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.json(updateddeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

const deletedeliveryBoyTransaction = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getdeliveryBoyTransaction =
      await deliveryBoyTransaction.findByIdAndDelete(id);
    res.json(getdeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

const getAlldeliveryBoyTransaction = asynchandler(async (req, res) => {
  try {
    const getdeliveryBoyTransaction = await deliveryBoyTransaction.find();
    res.json(getdeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

const getdeliveryBoyTransactionById = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getdeliveryBoyTransaction = await deliveryBoyTransaction.findById(id);
    res.json(getdeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

const deliveryBoyTransactionByBoy = asynchandler(async (req, res) => {
  try {
    const deliveryBoy = await deliveryBoyTransaction.find({
      deliverBy: req.params.id,
    });
    res.json(deliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const searchdeliveryBoyTransaction = asynchandler(async (req, res) => {
  try {
    const { search } = req.params;
    const getdeliveryBoyTransaction = await deliveryBoyTransaction.find({
      $text: req.params.search,
    });
    res.json(getdeliveryBoyTransaction);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  searchdeliveryBoyTransaction,
  getAlldeliveryBoyTransaction,
  getdeliveryBoyTransactionById,
  updatedeliveryBoyTransaction,
  deletedeliveryBoyTransaction,
  createdeliveryBoyTransaction,
  deliveryBoyTransactionByBoy,
};
