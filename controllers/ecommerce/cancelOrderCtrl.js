const mongoose = require("mongoose");
// const asyncHandler = require("express-async-handler");
// const Order = require("../models/pickupPoint_OrderModel");
const ReasonOrder = require("../../models/ecommerce/cancelOrderModel");
// const OrderStatusTransaction = require("../models/orderStatusTransactionModel");

const createReasonOrder = (async (req, res) => {
  try {
    let order = await Order.findOne({ _id: req.body.orderId, user: req.user._id});
    if (order == null) {
      return res.status(404).json({ message: "Not found" });
    } else {
      let orderTrans = await OrderStatusTransaction.create({
        orderId: req.body.orderId,
        orderStatusId: "6423dd0a2750beedd6aee260",
        Note: "Order Cancel By Customer",
      });
      req.body.accCompany_id = req.companyId;
      req.body.user = req.user._id;
      let reasonOrder = await ReasonOrder.create(req.body);
      res.json(reasonOrder);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonOrder = (async (req, res) => {
  try {
    let reasonOrder = await ReasonOrder.find({ accCompany_id: req.companyId })
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
    res.json(reasonOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const listReasonOrderByUser = (async (req, res) => {
  try {
    let reasonOrder = await ReasonOrder.find({ accCompany_id: req.companyId, user: req.user._id })
      .populate({
        path: "orderId",
        populate: {
          path: "language currency pickupAddress Payment_Status seller_id",
        },
      })
      .populate({
        path: "reason user",
        select: ["reason", "firstname", "lastname"],
      });

    res.json(reasonOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getReasonOrderById = (async (req, res) => {
  try {
    let reasonOrder = await ReasonOrder.findById(req.params.id);
    res.json(reasonOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReasonOrder = (async (req, res) => {
  try {
    if(req.type == "User") {
      let reasonOrder = await ReasonOrder.findOneAndDelete({ user: req.user._id, _id: req.params.id, accCompany_id: req.companyId});
      res.json(reasonOrder); 
    }
    else if(req.type == "Staff") {
      let reasonOrder = await ReasonOrder.findByIdAndDelete(req.params.id);
      res.json(reasonOrder);  
    }
    else {
      throw new Error("You are not Authorize!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = (async (req, res) => {
  try {
    if(req.type == "User") {
      let reasonOrder = await ReasonOrder.findOneAndUpdate({ user: req.user._id, _id: req.params.id, accCompany_id: req.companyId},       { status: req.body.status },
        { new: true }
  );
      res.json(reasonOrder); 
    }
    else if(req.type == "Staff") {
      let reasonOrder = await ReasonOrder.findByIdAndUpdate({ _id: req.params.id, accCompany_id: req.companyId},       { status: req.body.status },
        { new: true }
  );
      res.json(reasonOrder);  
    }
    else {
      throw new Error("You are not Authorize!");
    }

  } catch (error) {
    throw new Error(error);
  }
});

const updateReasonOrder = (async (req, res) => {
  try {
    let reasonOrder = await ReasonOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(reasonOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateStatus,
  createReasonOrder,
  deleteReasonOrder,
  getReasonOrderById,
  listReasonOrder,
  updateReasonOrder,
  listReasonOrderByUser,
};
