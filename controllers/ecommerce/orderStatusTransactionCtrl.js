const OrderStatus = require("../models/orderStatusTransactionModel");
const asyncHandler = require("express-async-handler");
const PickupPoint_Order = require("../models/pickupPoint_OrderModel");
const pickupPoint_Order = require("../models/pickupPoint_OrderModel");
const OrderStatusTrans = require("../models/orderStatusTransactionModel");
const OrderAssign = require("../models/assignOrderModel");
const ClubPointsUsers = require("../models/clubPointsUserModel");
const GeneralSetting = require("../models/generalSettingsModel");
const Client = require("../middlewares/redis");


const mongoose = require("mongoose");

const getOrderStatusList = asyncHandler(async (req, res) => {
  try {
    const allOrderStatuss = await OrderStatus.find();
    res.json(allOrderStatuss);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderStatusById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaOrderStatus = await OrderStatus.findById(id);
    res.json(getaOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrderStatus = asyncHandler(async (req, res) => {
  try {
    const order = await pickupPoint_Order.findOne({ accCompany_id: req.companyId, _id: req.body.orderId });
    if(order == null) {
      throw new Error("Order not found");
    }
    const orderStatusTrans = await OrderStatusTrans.find({
      orderId: req.body.orderId,
    }).sort({ createdAt: -1 });

    if (
      String(orderStatusTrans[0]?.orderStatusId) == "6423de6c2750beedd6aee26f"
    ) {
      throw new Error("Order is Already delivered!");
    } else {
      if (req.body.orderStatusId == null && req.body.pickupPoints != null) {
        req.body.orderStatusId = orderStatusTrans[0].orderStatusId;
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
      }
      const getOrderStatus = await OrderStatus.create(req.body);
      let order = await PickupPoint_Order.findByIdAndUpdate(
        getOrderStatus.orderId,
        { $push: { orderStatusTrans: getOrderStatus._id } }
      );

      if (req.body.orderStatusId == "6423de6c2750beedd6aee26f") {
        let pick = await pickupPoint_Order
          .findById(req.body.orderId)
          .populate("products.product");

        let clubPoints = [];

        pick.products.forEach((product) => {
          product.product?.variations?.forEach((variant) => {
            clubPoints.push(
              ClubPointsUsers.create({
                club_point_id: Number,
                product_id: product.product._id,
                order_id: req.body.orderId,
                variant_id: product.variant,
                seller_id: product?.variant?.seller_id,
                sku: product.variant.sku,
                user_id: pick.user,
                product_qty: product.count,
                point: variant.sale_rp * product.count,
                trans_type: "credit",
              })
            );
          });
        });

        Promise.all(clubPoints).then((result) => {});
        /*       order = await PickupPoint_Order.findByIdAndUpdate(
        getOrderStatus.orderId,0
        { Payment_Status: "644fba3275eb6d3d4914a611" }
      );
 */
        //}
        res.json(getOrderStatus);

        //        res.json({ message: "success" });
      } else {
        //const getOrderStatus = await OrderStatus.create(req.body);

        res.json({ message: "success" });
      }
      //    }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createPurchaseStatus = asyncHandler(async (req, res) => {
  try {
    const getOrderStatus = await OrderStatus.create(req.body);
    const purchase = await Purchase.findById(getOrderStatus.purchaseId);
    purchase.status.push(getOrderStatus._id);
    purchase.save();
    res.json(getOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});


const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedOrderStatus = await OrderStatus.findByIdAndDelete(id);
    res.json(deletedOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchOrderStatus = asyncHandler(async (req, res) => {
  try {
    const getSearchedOrderStatus = await OrderStatus.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderListByStatusTransaction = asyncHandler(async (req, res) => {
  try {
    let generalSettingCache = await Client.get(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`);
    let generalSetting;
    if(generalSettingCache == null) {
      const generalSettings = await GeneralSetting.findOne({
        accCompany_id: req.companyId,
        parent_id: "6488381f3f26992c4c3484fb",
      });  
      await Client.set(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, JSON.stringify(generalSettings));
      await Client.expire(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, 3600);
      generalSetting = generalSettings?.Timezone;
    }


    if(generalSetting == null || generalSetting == "null" || generalSetting == undefined) {
      generalSetting = "Asia/Kolkata";
    }

    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
        },
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "_id",
          foreignField: "orderId",
          as: "orderStatus",
        },
      },
      {
        $lookup: {
          from: "timeslots",
          let: {
            timeSlot: "$timeSlot",
            companyId: new mongoose.Types.ObjectId(req.companyId)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$$timeSlot", "$uid"] }, { $eq: ["$$companyId", "$accCompany_id"] }],
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
          localField: "currency",
          foreignField: "_id",
          as: "currency"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "paymentstatusmasters",
          localField: "Payment_Status",
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
          _id: "$_id",
          status: { $last:   "$orderStatus.orderStatusId"  },
          Balance: "$Balance",
          Paid: "$Paid",
          grandTotal: "$grandTotal",
          createdAt: { $dateToString: { date: "$createdAt", format: "%d/%m/%Y, %H:%M:%S", timezone: generalSetting }  },
          referenceNo: "$order_referenceNo",
          invoiceDate: { $dateToString: { date: "$invoiceDate", format: "%d/%m/%Y, %H:%M:%S", timezone: generalSetting }  },
          invoiceNo: "$order_invoiceNo",
          timeSlot: {$first: "$timeSlot.name"},
          deliveryType: "$deliveryType",
          date: "$date",
          currency: { $first: "$currency" },
          user: { $cond: { if: { $size: "$user" }, then: { firstname: {$first: "$user.firstname"}, lastname: {$first: "$user.lastname"} }, else: { firstname: "$billingAddress.bfirstname", lastname: "$billingAddress.blastname" }} },
          seller_id: {$first: "$seller"},
          paymentStatus: { $first: "$Payment_Status"},
          contactDetail:  "$contactDetail"
        },
      },
      {
        $match: {
          "status": new mongoose.Types.ObjectId(req.params.id)
        }
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
        $sort: {"createdAt": -1 }
      }
    ]);

    res.json(orders);
  } catch (error) {
    throw Error(error);
  }
});

const getOrderFilterByUser = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          user: new mongoose.Types.ObjectId(req.user._id)
        },
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "_id",
          foreignField: "orderId",
          as: "orderStatus",
        },
      },
      {
        $lookup: {
          from: "timeslots",
          let: {
            timeSlot: "$timeSlot",
            companyId: new mongoose.Types.ObjectId(req.companyId)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$$timeSlot", "$uid"] }, { $eq: ["$$companyId", "$accCompany_id"] }],
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
          localField: "currency",
          foreignField: "_id",
          as: "currency"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "paymentstatusmasters",
          localField: "Payment_Status",
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
          _id: "$_id",
          status: { $last:  "$orderStatus.orderStatusId" },
          Balance: "$Balance",
          Paid: "$Paid",
          grandTotal: "$grandTotal",
          createdAt: "$createdAt",
          referenceNo: "$order_referenceNo",
          invoiceDate: "$order_invoiceDate",
          invoiceNo: "$order_invoiceNo",
          timeSlot: {$first: "$timeSlot.name"},
          deliveryType: "$deliveryType",
          date: "$date",
          currency: { $first: "$currency" },
          user: { $first: "$user" },
          seller: "$seller",
          seller_id: "$seller_id",
          paymentStatus: { $first: "$Payment_Status" },
        },
      },
      {
        $match: {
          status: new mongoose.Types.ObjectId(req.params.id)
        }
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
        $sort: {"createdAt": -1 }
      }
    ]);
    res.json(orderList);
  } catch (error) {
    throw Error(error);
  }
});

const getOrderListByStatusTransactionPickupPoint = asyncHandler(
  async (req, res) => {
    try {
      let orderList = await PickupPoint_Order.find({
        pickupAddress: req.params.pick,
        accCompany_id: req.companyId
      })
        .populate("orderStatusTrans user pickupAddress Seller")
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
              order.orderStatusTrans[order.orderStatusTrans.length - 1]
                .orderStatusId
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

const getOrderAssignListByStatusTransactionPickupPoint = asyncHandler(
  async (req, res) => {
    try {
      let orderList = await OrderAssign.find({
        approve: true,
      })
        .populate({
          path: "orderId",
          populate: "orderStatusTrans user pickupAddress Seller",
        })
        .sort({ createdAt: -1 });

      if (orderList != null) {
        orderList = orderList.filter((order) => {
          d = order.orderId.createdAt;
          order.createdAt =
            [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
            " " +
            [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");

          if (
            String(
              order.orderId.orderStatusTrans[order.orderStatusTrans.length - 1]
                .orderStatusId
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
  getOrderStatusList,
  getOrderStatusById,
  getSearchOrderStatus,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
  createPurchaseStatus,
  getOrderListByStatusTransaction,
  getOrderListByStatusTransactionPickupPoint,
  getOrderAssignListByStatusTransactionPickupPoint,
  getOrderFilterByUser,
};
