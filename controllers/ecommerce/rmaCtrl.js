const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Order = require("../models/pickupPoint_OrderModel");
const RMA = require("../models/rmaModel");

const createRMA = asyncHandler(async (req, res) => {
  try {
    let order = await Order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.body.orderId)
        }
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "_id",
          foreignField: "orderId",
          as: "orderStatusTrans"
        }
      },
      {
        $project: {
          _id: null,
          status: { $last: "$orderStatusTrans" }
        }
      }
    ]);
    if (order == null) {
      throw new Error("Order Not found");
    } else if (
      String(
        order[0].status.orderStatusId
      ) != String("6423de6c2750beedd6aee26f")
    ) {
      throw new Error("Delivery status must be delivered");
    } else {
      let rma = await RMA.create({
        orderId: req.body.orderId,
        product_id: req.body.product_id,
        variant_id: req.body.variant_id,
        status: "Pending",
        resulution_type: req.body.resolution_type,
        pickupTime: req.body.pickupTime,
        returnPickupAddress: req.body.returnPickupAddress,
        reason: req.body.reason,
        user: req.user._id,
        accCompany_id: req.companyId
      });
      res.json(rma);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const listRMA = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.find({ accCompany_id: req.companyId })
      .populate({
        path: "product_id reason user",
        select: [
          "name",
          "mainimage_url",
          "variations",
          "firstname",
          "lastname",
        ],
      })
      .lean();
    rma.forEach((rm) => {
      rm.product_id?.variations?.forEach((variant) => {
        if (String(rm.variant_id) == String(variant._id)) {
          rm.variant_id = variant;
        }
      });
    });

    res.json(rma);
  } catch (error) {
    throw new Error(error);
  }
});

const listByUser = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.aggregate(
      [
        { 
          $match: {
            user: new mongoose.Types.ObjectId(req.user._id), 
            accCompany_id: new mongoose.Types.ObjectId(req.companyId)
          }
        },
        {
          $lookup: {
            from: "reasons",
            localField: "reason",
            foreignField: "_id",
            as: "reason"
          }
        },
        {
          $lookup: {
            from: "product_tests",
            let: { product_id: "$product_id", language_id: new mongoose.Types.ObjectId(req.user.language_id) },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$accCompany_id", new mongoose.Types.ObjectId(req.companyId)] },
                      { $eq: ["$uid", "$$product_id"] },
                      { $eq: ["$language_id", "$$language_id"] }
                    ]
                  }
                }
              }
            ],
            as: "product_id"
          }
        },
      ]);
    rma.forEach((rm) => {
      rm.product_id[0]?.variations?.forEach((variant) => {
        if (String(rm.variant_id) == String(variant.uid)) {
          rm.variant_id = variant;
        }
      });
      rm.product_id = {
        uid: rm.product_id[0].uid,
        name: rm.product_id[0].name
      }
    });
    res.json(rma);
  } catch (error) {
    throw new Error(error);
  }
});

const getRMAById = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.findById(req.params.id);
    res.json(rma);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRMA = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.findByIdAndDelete(req.params.id);
    res.json(rma);
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateRMA = asyncHandler(async (req, res) => {
  try {
    let rma = await RMA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateStatus,
  createRMA,
  deleteRMA,
  getRMAById,
  listRMA,
  updateRMA,
  listByUser,
};
