const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Order = require("../models/pickupPoint_OrderModel");
const ReasonRMA = require("../models/reasonRMAModel");

const createReasonRMA = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.create(req.body);
    res.json(Reasonrma);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonRMA = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.find();
    res.json(Reasonrma);
  } catch (error) {
    throw new Error(error);
  }
});

const getReasonRMAById = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.findById(req.params.id);
    res.json(Reasonrma);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReasonRMA = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.findByIdAndDelete(req.params.id);
    res.json(Reasonrma);
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateReasonRMA = asyncHandler(async (req, res) => {
  try {
    let Reasonrma = await ReasonRMA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateStatus,
  createReasonRMA,
  deleteReasonRMA,
  getReasonRMAById,
  listReasonRMA,
  updateReasonRMA,
};
