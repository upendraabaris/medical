const mongoose = require("mongoose");
// const asyncHandler = require("express-async-handler");
// const Order = require("../models/pickupPoint_OrderModel");
const ReasonDeliveryBoyOrder = require("../../models/ecommerce/cancelDeliveryModel");

const createReasonDeliveryBoyOrder = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.create(req.body);
    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonDeliveryBoyOrder = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.find()
      .populate({
        path: "orderId",
        populate: {
          path: "language currency pickupAddress Payment_Status Seller",
        },
      })
      .populate({
        path: "reason user",
        select: ["reason", "firstname", "lastname"],
      });
    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonDeliveryBoyOrderByUser = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.find({
      user: req.params.id,
    })
      .populate({
        path: "orderId",
        populate: {
          path: "language currency pickupAddress Payment_Status Seller",
        },
      })
      .populate({
        path: "reason user",
        select: ["reason", "firstname", "lastname"],
      });

    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getReasonDeliveryBoyOrderById = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.findById(
      req.params.id
    );
    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReasonDeliveryBoyOrder = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.findByIdAndDelete(
      req.params.id
    );
    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateReasonDeliveryBoyOrder = (async (req, res) => {
  try {
    let reasonDeliveryBoyOrder = await ReasonDeliveryBoyOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(reasonDeliveryBoyOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateStatus,
  createReasonDeliveryBoyOrder,
  deleteReasonDeliveryBoyOrder,
  getReasonDeliveryBoyOrderById,
  listReasonDeliveryBoyOrder,
  updateReasonDeliveryBoyOrder,
  listReasonDeliveryBoyOrderByUser,
};
