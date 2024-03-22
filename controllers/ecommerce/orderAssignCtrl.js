const OrderAssign = require("../models/assignOrderModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const PickupPoint_Order = require("../models/pickupPoint_OrderModel");
const PickupPoints = require("../models/pickupPointsModel");

const listAssignOrderByPickupPoints = asyncHandler(async (req, res) => {
  try {
    const pickupList = await PickupPoints.find({ accCompany_id: req.companyId, pickUpManagerSchema: req.user._id });

    let picks = [];
    pickupList?.forEach((pick) => {
      picks.push(new mongoose.Types.ObjectId(pick));
    });


    let assignOrder = await OrderAssign.aggregate([
      {
        $match: {
          approve: true,
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          pickupPoints: { $in: picks }
        }
      },
      {
          $lookup: {
              from: "pickuppoint_orders",
              localField: "orderId",
              foreignField: "_id",
              as: "orderId"
          }
      },
      {
           $unwind: "$orderId"  
      },
      {
          $lookup: {
              from: "orderstatus_transactions",
              localField: "orderId._id",
              foreignField: "orderId",
              as: "orderStatus",
          },
      },
      {
          $lookup: {
              from: "timeslots",
              let: {
                  timeSlot: "$orderId.timeSlot",
              },
              pipeline: [
                  {
                      $match: {
                          $expr: {
                              $and: [{ $eq: ["$$timeSlot", "$uid"] }],
                          },
                      },
                  },
              ],
              as: "timeSlot",
          }
      },
      {
          $lookup: {
              from: "currencies",
              localField: "orderId.currency",
              foreignField: "_id",
              as: "currency"
          }
      },
      {
          $lookup: {
              from: "users",
              localField: "orderId.user",
              foreignField: "_id",
              as: "user"
          }
      },
      {
          $lookup: {
              from: "paymentstatusmasters",
              localField: "orderId.Payment_Status",
              foreignField: "_id",
              as: "Payment_Status"
          }
      },
      {
          $lookup: {
              from: "sellers",
              localField: "seller_id",
              foreignField: "_id",
              as: "seller"
          }
      },
      {
          $project: {
              _id: "$orderId._id",
              status: { $last: "$orderStatus.orderStatusId" },
              Balance: "$orderId.Balance",
              Paid: "$orderId.Paid",
              grandTotal: "$orderId.grandTotal",
              createdAt: "$orderId.createdAt",
              referenceNo: "$orderId.order_referenceNo",
              timeSlot: { $first: "$orderId.timeSlot.name" },
              deliveryType: "$orderId.deliveryType",
              date: "$orderId.date",
              currency: { $first: "$currency" },
              user: { $first: "$user" },
              seller: "$orderId.seller",
              seller_id: "$orderId.seller_id",
              paymentStatus: { $first: "$Payment_Status" },
              pickupPoint: "$pickupPoints"
          },
      },
      {
          $lookup: {
              from: "orderstatusmasters",
              localField: "status",
              foreignField: "_id",
              as: "status",
          },
      },
      {
        $lookup: {
          from: "sellers",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller_id"
        }
      }
  ]);
    res.json(assignOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const listAllAssignOrder = asyncHandler(async (req, res) => {
  try {
    let assignOrders = await OrderAssign.aggregate([
      {
        $lookup: {
          from: "pickuppoint_orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orders",
        },
      },
      /*       {
        $lookup: {
          from: "product_tests",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $lookup: {
          from: "users",
          localField: "orders.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $unwind: "$product.variations",
      },
      {
        $match: {
          $and: [
            {
              $expr: {
                $eq: ["$product.variations.sku", "$sku"],
              },
            },
          ],
        },
      },
 */ {
        $lookup: {
          from: "pickup_points",
          localField: "pickupPoints",
          foreignField: "_id",
          as: "pickupPoints",
        },
      },
      {
        $unwind: "$pickupPoints",
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $match: {
          approve: true,
        },
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "orders.orderStatusTrans",
          foreignField: "_id",
          as: "orderStatusTrans",
        },
      },
    ]);
    res.json(assignOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const assignOrderById = asyncHandler(async (req, res) => {
  try {
    let assignOrders = await OrderAssign.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "pickuppoint_orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "product_tests",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $lookup: {
          from: "users",
          localField: "orders.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $unwind: "$product.variations",
      },
      {
        $match: {
          $and: [
            {
              $expr: {
                $eq: ["$product.variations.sku", "$sku"],
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "pickup_points",
          localField: "pickupPoints",
          foreignField: "_id",
          as: "pickupPoints",
        },
      },
      {
        $unwind: "$pickupPoints",
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
    res.json(assignOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrderAssign = asyncHandler(async (req, res) => {
  try {
    let order = await PickupPoint_Order.findById(req.body.orderId);
    if (order == null) {
      throw new Error("order Not found");
    }

    let orderAss = await OrderAssign.updateMany(
      { orderId: req.body.orderId },
      { $set: { approve: false } }
    );

    const orderAssign = await OrderAssign.create({
      orderId: req.body.orderId,
      pickupPoints: req.body.pickupPoints,
      approve: true,
      accCompany_id: req.companyId
    });
    res.json(orderAssign);
  } catch (error) {
    throw new Error(error);
  }
});

const allAssignOrder = asyncHandler(async (req, res) => {
  try {
    let order = await OrderAssign.aggregate([
      {
        $lookup: {
          from: "pickuppoint_orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $lookup: {
          from: "users",
          localField: "orders.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "pickup_points",
          localField: "pickupPoints",
          foreignField: "_id",
          as: "pickupPoints",
        },
      },
      {
        $unwind: "$pickupPoints",
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "orders.orderStatusTrans",
          foreignField: "_id",
          as: "orderStatusTrans",
        },
      },
    ]);
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderListByStatusTransactionPickupPoint = asyncHandler(
  async (req, res) => {
    try {
      let orderList = await OrderAssign.find({
        approve: true,
        pickupPoints: req.params.pick,
      })
        .populate({
          path: "orderId",
          populate: { path: "orderStatusTrans user pickupAddress Seller" },
        })
        .sort({ createdAt: -1 });

      if (orderList != null) {
        orderList = orderList.filter((order) => {
          d = order.createdAt;
          order.createdAt =
            [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
            " " +
            [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");

          if (
            String(
              order.orderId.orderStatusTrans[
                order?.orderId.orderStatusTrans.length - 1
              ].orderStatusId
            ) == req.params.id
          ) {
            return order;
          }
        });
      }
      res.json(orderList);
    } catch (error) {
      throw Error(error);
    }
  }
);

module.exports = {
  listAssignOrderByPickupPoints,
  listAllAssignOrder,
  assignOrderById,
  createOrderAssign,
  allAssignOrder,
  getOrderListByStatusTransactionPickupPoint,
};
