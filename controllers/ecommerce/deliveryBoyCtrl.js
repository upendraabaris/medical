const User = require("../models/userModel");
const deliveryBoy = require("../models/deliveryBoyModel");
const asynchandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const cloudinary = require("../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");
const PickupPoints = require("../models/pickupPointsModel");
const AssignDeliveryBoyOrder = require("../models/assignDeliveryBoyModel");
const mongoose = require("mongoose");

const deliveryBoyLogin = asynchandler(async (req, res) => {
  try {
    const finddeliveryBoy = await deliveryBoy
      .findOne({
        email: req.body.email,
      })
      .populate("role_id");
    if (finddeliveryBoy != null) {
      let pass = await finddeliveryBoy.isPasswordMatched(req?.body?.password);
      if (pass) {
        res.json({
          message: "Successfully Login",
          token: generateToken({id: finddeliveryBoy?._id, type: "Delivery"}),

          finddeliveryBoy,
        });
      } else {
        res.status(401).json({
          message: "That Email Id or Password not correct.",
          code: "258",
        });
      }
    } else if (finddeliveryBoy == null) {
      res.status(401).json({
        message: "That Email Id or Password not correct.",
        code: "258",
      });
    } else {
      res.status(403).json({
        message: "That Email Id or Password not correct.",
        code: "258",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createdeliveryBoy = asynchandler(async (req, res) => {
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
    }
    req.body.accCompany_id  = req.companyId;
    req.body.profilePhoto = image;
    const getDeliveryBoy = await deliveryBoy.create(req.body);
    res.json(getDeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedeliveryBoy = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    let image;

    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
      req.body.profilePhoto = image;

      const categ = await deliveryBoy.findById(id);
      await cloudinary
        .cloudinaryDeleteImg(categ?.image?.public_id)
        .then((result) => {});

      const updateddeliveryBoy = await deliveryBoy.findOneAndUpdate(
        { _id: id, accCompany_id: req.companyId },
        req.body,
        {
          new: true,
        }
      );

      res.json(updateddeliveryBoy);
    } else {
      const updateddeliveryBoy = await deliveryBoy.findOneAndUpdate(
        { _id: id, accCompany_id: req.companyId },
        req.body,
        {
          new: true,
        }
      );
      res.json(updateddeliveryBoy);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deletedeliveryBoy = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getdeliveryBoy = await deliveryBoy.findOneAndDelete({ _id: id, accCompany_id: req.companyId });
    res.json(getdeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const getAlldeliveryBoy = asynchandler(async (req, res) => {
  try {
    const getdeliveryBoy = await deliveryBoy.find({ accCompany_id: req.companyId }).populate("pickupPoint");
    res.json(getdeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const getAlldeliveryBoyByPickupPoint = asynchandler(async (req, res) => {
  try {
    const pickupPoint = await PickupPoints.find({ accCompany_id: req.companyId, pickUpManagerSchema: req.user._id });
    let pickList = [];
    pickupPoint.forEach((pick) => {
      pickList.push(pick?._id);
    })
    console.log(pickList);
    const getdeliveryBoy = await deliveryBoy
      .find({
        pickupPoint: { $in: pickList},
        accCompany_id: req.companyId
      })
      .populate("pickupPoint");
    res.json(getdeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const getdeliveryBoyById = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getdeliveryBoy = await deliveryBoy
      .findOne({ _id: id, accCompany_id: req.companyId })
      .populate("pickupPoint");
    res.json(getdeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const searchdeliveryBoy = asynchandler(async (req, res) => {
  try {
    const { search } = req.params;
    const getdeliveryBoy = await deliveryBoy.find({ $text: req.params.search, accCompany_id: req.params.id });
    res.json(getdeliveryBoy);
  } catch (error) {
    throw new Error(error);
  }
});

const deliveryBoyCount = asynchandler(async (req, res) => {
  try {
    let deliveryBoyCount = await deliveryBoy
      .find({ deliveryBoy: req.params.id, accCompany_id: req.companyId })
      .count();

    let CancelledOrderCount = await deliveryBoy
      .find({ approved: false })
      .count();

    let DeliveredOrderCount = await AssignDeliveryBoyOrder.aggregate([
      {
        $match: {
          deliveryBoy: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "pickuppoint_orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orderId",
        },
      },
      {
        $unwind: "$orderId",
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "orderId.orderStatusTrans",
          foreignField: "_id",
          as: "orderId.orderStatusTrans",
        },
      },
      {
        $addFields: {
          orderStatus: { $slice: ["$orderId.orderStatusTrans", -1] },
        },
      },
      {
        $match: {
          "orderStatus.0.orderStatusId": new mongoose.Types.ObjectId(
            "6423de6c2750beedd6aee26f"
          ),
        },
      },
    ]);

    let PendingOrderCount = await AssignDeliveryBoyOrder.aggregate([
      {
        $match: {
          deliveryBoy: new mongoose.Types.ObjectId(req.params.id),
          approved: true,
        },
      },
      {
        $lookup: {
          from: "pickuppoint_orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orderId",
        },
      },
      {
        $unwind: "$orderId",
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "orderId.orderStatusTrans",
          foreignField: "_id",
          as: "orderId.orderStatusTrans",
        },
      },
      {
        $addFields: {
          orderStatus: { $slice: ["$orderId.orderStatusTrans", -1] },
        },
      },
      {
        $match: {
          "orderStatus.0.orderStatusId": {
            $ne: [new mongoose.Types.ObjectId("6423de6c2750beedd6aee26f")],
          },
        },
      },
    ]);

    res.json({
      deliveryBoyCount: deliveryBoyCount,
      deliveredOrder: DeliveredOrderCount.length,
      CancelledOrderCount,
      PendingOrderCount: PendingOrderCount.length,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  searchdeliveryBoy,
  getAlldeliveryBoy,
  getAlldeliveryBoyByPickupPoint,
  getdeliveryBoyById,
  updatedeliveryBoy,
  deletedeliveryBoy,
  createdeliveryBoy,
  deliveryBoyLogin,
  deliveryBoyCount,
};
