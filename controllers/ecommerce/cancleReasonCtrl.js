const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Order = require("../../models/ecommerce/pickupPoint_OrderModel");
const ReasonCancel = require("../../models/ecommerce/cancelReasonModel");

const createReasonCancel = asyncHandler(async (req, res) => {
  try {
    
    let reasonCancel = await ReasonCancel.create(req.body);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonCancel = asyncHandler(async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.find();
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const getReasonCancelById = asyncHandler(async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findById(req.params.id);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReasonCancel = asyncHandler(async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findByIdAndDelete(req.params.id);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateReasonCancel = asyncHandler(async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateStatus,
  createReasonCancel,
  deleteReasonCancel,
  getReasonCancelById,
  listReasonCancel,
  updateReasonCancel,
};
