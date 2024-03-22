const Delivery = require("../models/deliveriesModel");
const asyncHandler = require("express-async-handler");
const OrderStatus = require("../models/orderStatusTransactionModel");
const PickupPoint_Order = require("../models/pickupPoint_OrderModel");
const cloudinary = require("../utils/cloudinary");
const path = require("path");
const Order = require("../models/pickupPoint_OrderModel");
__dirname = path.resolve(path.dirname(__filename), "../");

const getDeliveryList = asyncHandler(async (req, res) => {
  try {
    const allDeliverys = await Delivery.find();
    return res.json(allDeliverys);
  } catch (error) {
    throw new Error(error);
  }
});

const getDeliverysById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDeliverys = await Delivery.findById(id);
    return res.json(getaDeliverys);
  } catch (error) {
    throw new Error(error);
  }
});

const getDeliveryByOrder = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
});

const createDeliverys = asyncHandler(async (req, res) => {
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
    }
    req.body.photo = image;

    let delivery = await Delivery.findOne({ order_id: req.body.order_id });
    let Order = await OrderStatus.find({ orderId: req.body.order_id });
    if (req.body.rcDate == "undefined" || req.body.rcDate == "null") {
      req.body.rcDate = undefined;
    }
    if (req.body.courierName == "undefined" || req.bodycourierName == "null") {
      req.body.courierName = undefined;
    }
    if (delivery == null) {
      if (
        String(Order[Order.length - 1].orderStatusId) ==
        String("6423dd0a2750beedd6aee260")
      ) {
        throw new Error("Order Is Already cancelled");
      } else {
        const Deliverys = await Delivery.create(req.body);

        if (req.body.orderStatusId == undefined) {
          req.body.orderStatusId = Order[Order.length - 1].orderStatusId;
        }
        if (
          String(Order[Order.length - 1].orderStatusId) !=
          "6423de6c2750beedd6aee26f"
        ) {
          const getOrderStatus = await OrderStatus.create({
            orderId: req.body.order_id,
            orderStatusId: req.body.orderStatusId,
            note: req.body.note,
            deliver: Deliverys?._id,
          });

          const order = await PickupPoint_Order.findByIdAndUpdate(
            getOrderStatus.orderId,
            { $push: { orderStatusTrans: getOrderStatus._id } }
          );
          return res.json(Deliverys);
        }
      }
    } else {
      if (
        String(Order[Order.length - 1].orderStatusId) ==
        String("6423dd0a2750beedd6aee260")
      ) {
        throw new Error("Order Is Already cancelled");
      } else {
        const Deliverys = await Delivery.findByIdAndUpdate(
          delivery._id,
          req.body,
          { new: true }
        );

        if (req.body.orderStatusId == undefined) {
          req.body.orderStatusId = Order[Order.length - 1].orderStatusId;
        }
        if (
          String(Order[Order.length - 1].orderStatusId) !=
          "6423de6c2750beedd6aee26f"
        ) {
          const getOrderStatus = await OrderStatus.create({
            orderId: req.body.order_id,
            orderStatusId: req.body.orderStatusId,
            note: req.body.note,
            deliver: Deliverys?._id,
          });

          const order = await PickupPoint_Order.findByIdAndUpdate(
            getOrderStatus.orderId,
            { $push: { orderStatusTrans: getOrderStatus._id } }
          );
        }
        return res.json(Deliverys);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateDeliverys = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
      req.body.logo = image;
      const categ = await Delivery.findById(id);
      await cloudinary
        .cloudinaryDeleteImg(categ?.logo?.public_id)
        .then((result) => {});
      const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedDelivery);
    } else {
      const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedDelivery);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDeliverys = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDeliverys = await Delivery.findByIdAndDelete(id);
    return res.json(deletedDeliverys);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchDelivery = asyncHandler(async (req, res) => {
  try {
    const getSearchedDelivery = await Delivery.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    return res.json(getSearchedDelivery);
  } catch (error) {
    throw new Error(error);
  }
});

const getDeliveryByOrderId = asyncHandler(async (req, res) => {
  try {
    const DeliverList = await Delivery.find({ order_id: req.params.id });
    return res.json(DeliverList);
  } catch (error) {
    throw new Error(error);
  }
});

const findByAwbOrReferenceNo = asyncHandler(async (req, res) => {
  try {
    let delivery = await Delivery.findOne({
      $or: [
        {
          AwbNo: req.body.courier_reference_no,
        },
        {
          courier_reference_no: req.body.courier_reference_no,
        },
        {
          order_id: req.body.order_id,
        },
      ],
    })
      .populate({
        path: "order_id",
        populate: {
          path: "orderStatusTrans language currency pickupAddress Payment_Status Seller",
        },
      })
      .populate("customer_id");

    let order;
    if (delivery == null && req.body.courier_reference_no.length == 24) {
      order = await Order.findById(req.body.courier_reference_no);
      if (order != null) {
        delivery = await Delivery.findOne({ order_id: order._id });
      } else {
        delivery = await Delivery.findById(req.body.courier_reference_no)
          .populate({
            path: "order_id",
          })
          .populate("customer_id");
      }
    } else {
      order = await Order.findOne({
        order_referenceNo: req.body.courier_reference_no,
      });
      if (order != null) {
        delivery = await Delivery.findOne({ order_id: order._id });
      } /* else {
        delivery = await Delivery.findById(req.body.courier_reference_no)
          .populate({
            path: "order_id",
          })
          .populate("customer_id");
      } */
    }

    if (delivery != null && delivery.length != 0) {
      const getOrderTrans = await OrderStatus.find({
        orderId: delivery?.order_id?._id,
      })
        .populate("orderStatusId")
        .populate({
          path: "staffid",
        })
        .populate({
          path: "userid",
          select: ["firstname", "lastname", "mobile"],
        })
        .sort({ createdAt: -1 });

      let deliverys = await Delivery.find({ order_id: delivery.order_id._id });

      res.json({ delivery, getOrderTrans, deliverys });
    } else if (order != null) {
      const getOrderTrans = await OrderStatus.find({
        orderId: order?._id,
      })
        .populate("orderStatusId")
        .populate({
          path: "staffid",
        })
        .populate({
          path: "userid",
          select: ["firstname", "lastname", "mobile"],
        })
        .sort({ createdAt: -1 });

      let deliverys = await Delivery.find({ order_id: order._id });

      res.json({ delivery, getOrderTrans, deliverys });
    } else {
      throw new Error("Delivery Not Found!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createDeliverys,
  updateDeliverys,
  deleteDeliverys,
  getDeliveryList,
  getDeliverysById,
  getSearchDelivery,
  getDeliveryByOrderId,
  findByAwbOrReferenceNo,
};
