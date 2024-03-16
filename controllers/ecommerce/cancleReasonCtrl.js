const mongoose = require("mongoose");
// const asyncHandler = require("express-async-handler");
// const Order = require("../models/pickupPoint_OrderModel");
const ReasonCancel = require("../../models/ecommerce/cancelReasonModel");

const createReasonCancel = (async (req, res) => {
  try {
    
    let reasonCancel = await ReasonCancel.create(req.body);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonCancel = (async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.find();
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const getReasonCancelById = (async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findById(req.params.id);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReasonCancel = (async (req, res) => {
  try {
    let reasonCancel = await ReasonCancel.findByIdAndDelete(req.params.id);
    res.json(reasonCancel);
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = (async (req, res) => {
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

const updateReasonCancel = (async (req, res) => {
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
