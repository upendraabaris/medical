const Order = require("../../models/ecommerce/orderModel");
const asyncHandler = require("express-async-handler");
const User = require("../../models/user/userModel");
const ShippingAddress = require("../../models/shippingAddressModel");
const Product = require("../../models/ecommerce/productModel");
const orderStatusTransaction = require("../../models/ecommerce/orderStatusTransactionModel");
const pickupPoint_Order = require("../../models/ecommerce/pickupPoint_OrderModel");
// const OrderMaster = require("../models/orderMasterModel");
/* const ClubPointsUsers = require("../models/clubPointsUserModel");
const EMI = require("../models/emiModel");
//  */const PickupPointsStock = require("../../models/ecommerce/pickupPoint_stockModel");
const mongoose = require("mongoose");
// const ProductStock = require("../models/pickupPoint_stockModel");
// const ProductStockQty = require("../models/productStockModel");
// const OrderAssign = require("../models/assignOrderModel");
// const Delivery = require("../models/deliveriesModel");

// const Wholesale = require("../models/wholesaleModel");
// const WholesalePrice = require("../models/wholesaleModel");
// const ProductCostVariation = require("../models/productCostVariationModel");
// const Currency = require("../models/currencyModel");

// const AssignOrder = require("../models/assignOrderModel");
/* const AffiliateBasic = require("../models/affiliateBasicModel");
const AffiliateLogs = require("../models/affiliateLogslModel");
const AffiliateUser = require("../models/affiliateUserModel");
 */const Seller = require("../../models/ecommerce/sellersModel");
// const AssignDeliveryBoy = require("../models/assignDeliveryBoyModel");
// const Coupon = require("../models/couponModel");

// const ShippingSettings = require("../models/shipping/shippingSettingModel");
// const ShippingPrice = require("../models/shipping/shippingPriceModel");
const jwt = require("jsonwebtoken");
// const Country = require("../models/crm/countryModel");



const GeneralSetting = require("../../models/generalSettingsModel");
const Client = require("../../middleware/redis");

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  // validateMongoDbId(_id);
  try {
    const userorders = await pickupPoint_Order
      .findOne({ orderby: _id })
      .populate("products.product")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .populate("user");
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders_Sellers = asyncHandler(async (req, res) => {
  try {
    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
          accCompany_id: new mongoose.Types.ObjectId(req.companyId),
          seller_id: new mongoose.Types.ObjectId(req.user._id)
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
          status: { $last: "$orderStatus.orderStatusId" },
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
          paymentStatus: { $first: "$Payment_Status" }
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
        $sort: {
          createdAt: -1
        }
      }
    ]);
    let sellers = [];
    orders.forEach((order) => {
      sellers.push(Seller.findById(order.seller_id));
    })
    Promise.all(sellers).then((result) => {
      orders?.forEach((order) => {
        result?.forEach((seller) => {
          if(String(order?.seller_id) == String(seller?._id)) {
            order.seller_id = seller;
          }
        })
      })
      res.json(orders);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    console.log(req.body.id)
    console.log(req.body.order_type)
    let generalSettingCache = await Client.get(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`);
    
    let generalSetting;
    console.log(generalSetting);

    if(generalSettingCache == null) {
      const generalSettings = await GeneralSetting.findById({
        // accCompany_id: req.companyId,
        _id: "6488381f3f26992c4c3484fb",
      });  
      await Client.set(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, JSON.stringify(generalSettings));
      await Client.expire(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, 3600);
      generalSetting = generalSettings.Timezone;
    }

    if(generalSetting == null || generalSetting == "null" || generalSetting == undefined) {
      generalSetting = "Asia/Kolkata";
    }
    order_type = req.body.order_type,
    user_id = req.body.user_id

    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
            order_type: order_type,
            user_id: new mongoose.Types.ObjectId(user_id)
        }
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
          status: { $last: "$orderStatus.orderStatusId" },
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
          paymentStatus: { $first: "$Payment_Status" },
          contactDetail:  "$contactDetail",
          order_type: "$order_type",
          questions: "$questions",
          vitals: "$vitals"
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
        $sort: {"createdAt": -1 }
      }
    ]);
/*     let sellers = [];
    orders.forEach((order) => {
      sellers.push(Seller.findById(order.seller_id));
    })
    Promise.all(sellers).then((result) => {
      orders?.forEach((order) => {
        result?.forEach((seller) => {
          if(String(order?.seller_id) == String(seller?._id)) {
            order.seller_id = seller;
          }
        })
      })
 */      res.json(orders);
//    })
  } catch (error) {
    throw new Error(error);
  }
});


const getAllOrdersByType = asyncHandler(async (req, res) => {
  try {
    console.log(req.body.id)
    console.log(req.body.order_type)
    let generalSettingCache = await Client.get(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`);
    
    let generalSetting;
    console.log(generalSetting);

    if(generalSettingCache == null) {
      const generalSettings = await GeneralSetting.findById({
        // accCompany_id: req.companyId,
        _id: "6488381f3f26992c4c3484fb",
      });  
      await Client.set(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, JSON.stringify(generalSettings));
      await Client.expire(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, 3600);
      generalSetting = generalSettings.Timezone;
    }

    if(generalSetting == null || generalSetting == "null" || generalSetting == undefined) {
      generalSetting = "Asia/Kolkata";
    }
    order_type = req.body.order_type,
    user_id = req.body.user_id

    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
            order_type: order_type,
            // user_id: new mongoose.Types.ObjectId(user_id)
        }
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
          status: { $last: "$orderStatus.orderStatusId" },
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
          paymentStatus: { $first: "$Payment_Status" },
          contactDetail:  "$contactDetail",
          order_type: "$order_type",
          questions: "$questions",
          vitals: "$vitals"
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
        $sort: {"createdAt": -1 }
      }
    ]);
/*     let sellers = [];
    orders.forEach((order) => {
      sellers.push(Seller.findById(order.seller_id));
    })
    Promise.all(sellers).then((result) => {
      orders?.forEach((order) => {
        result?.forEach((seller) => {
          if(String(order?.seller_id) == String(seller?._id)) {
            order.seller_id = seller;
          }
        })
      })
 */      res.json(orders);
//    })
  } catch (error) {
    throw new Error(error);
  }
});


const getAllOrdersByUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body.id)
    console.log(req.body.order_type)
    let generalSettingCache = await Client.get(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`);
    
    let generalSetting;
    console.log(generalSetting);

    if(generalSettingCache == null) {
      const generalSettings = await GeneralSetting.findById({
        // accCompany_id: req.companyId,
        _id: "6488381f3f26992c4c3484fb",
      });  
      await Client.set(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, JSON.stringify(generalSettings));
      await Client.expire(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`, 3600);
      generalSetting = generalSettings.Timezone;
    }

    if(generalSetting == null || generalSetting == "null" || generalSetting == undefined) {
      generalSetting = "Asia/Kolkata";
    }
    order_type = req.body.order_type,
    user_id = req.body.user_id

    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
            // order_type: order_type,
            user_id: new mongoose.Types.ObjectId(req.user)
        }
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
          status: { $last: "$orderStatus.orderStatusId" },
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
          paymentStatus: { $first: "$Payment_Status" },
          contactDetail:  "$contactDetail",
          order_type: "$order_type",
          questions: "$questions",
          vitals: "$vitals"
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
        $sort: {"createdAt": -1 }
      }
    ]);
/*     let sellers = [];
    orders.forEach((order) => {
      sellers.push(Seller.findById(order.seller_id));
    })
    Promise.all(sellers).then((result) => {
      orders?.forEach((order) => {
        result?.forEach((seller) => {
          if(String(order?.seller_id) == String(seller?._id)) {
            order.seller_id = seller;
          }
        })
      })
 */      res.json(orders);
//    })
  } catch (error) {
    throw new Error(error);
  }
});




const getAllOrdersFilter = asyncHandler(async (req, res) => {
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
      generalSetting = generalSettings.Timezone;
    }

    if(generalSetting == null || generalSetting == "null" || generalSetting == undefined) {
      generalSetting = "Asia/Kolkata";
    }

    let filter = {};
    if(req.body.paymentStatus != null) {
        filter =  { "paymentStatus._id": new mongoose.Types.ObjectId(req.body.paymentStatus) };
    }
    if(req.body.status != null) {
      filter = { "status": new mongoose.Types.ObjectId(req.body.status) };
    }

    if(req.body.paymentStatus != null && req.body.status != null) {
      filter = { "paymentStatus._id": new mongoose.Types.ObjectId(req.body.paymentStatus), "status": new mongoose.Types.ObjectId(req.body.status) }
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
          status: { $last:  "$orderStatus.orderStatusId" },
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
          user: { $first: "$user" },
          seller_id: "$seller",
          paymentStatus: { $first: "$Payment_Status" },
          contactDetail:  "$contactDetail" 
        },
      },
      {
        $match: filter
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
/*     let sellers = [];
    orders.forEach((order) => {
      sellers.push(Seller.findById(order.seller_id));
    })
    Promise.all(sellers).then((result) => {
      orders?.forEach((order) => {
        result?.forEach((seller) => {
          if(String(order?.seller_id) == String(seller?._id)) {
            order.seller_id = seller;
          }
        })
      })
 */      res.json(orders);
//    })
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrderPickupPoints = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let orderAssign = await OrderAssign.find({ approve: true });
    let orderIds = orderAssign?.map(({ orderId }) => {
      return orderId;
    });

    let alluserorders = await pickupPoint_Order
      .find({ $or: [{ pickupAddress: id }, { _id: orderIds }] })
      .populate("products.product")
      .populate("products.pickupPoints")
      .populate("Payment_Status")
      .populate({ path: "user", populate: { path: "currency language" } })
      .populate("orderStatusTrans")
      .populate("language currency")
      .lean();
    alluserorders.forEach((order) => {
      d = order.createdAt;
      order.createdAt =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    });
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllInHouseOrderPickupPoints = asyncHandler(async (req, res) => {
  try {
    let alluserorders = await pickupPoint_Order
      .find({ pickupAddress: req.params.id })
      .populate("products.product")
      .populate("products.pickupPoints")
      .populate("Payment_Status")
      .populate({ path: "user", populate: { path: "currency language" } })
      .populate("orderStatusTrans")
      .populate("language currency")
      .lean();
    alluserorders.forEach((order) => {
      d = order.createdAt;
      order.createdAt =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    });
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let orders = await pickupPoint_Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          accCompany_id: new mongoose.Types.ObjectId(req.companyId)
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
        $project: {
          _id: "$_id",
          status: { $last: "$orderStatus.orderStatusId" },
          Balance: "$Balance",
          Paid: "$Paid",
          grandTotal: "$grandTotal",
          createdAt: "$createdAt",
          referenceNo: "$order_referenceNo",
          timeSlot: {$first: "$timeSlot.name"},
          deliveryType: "$deliveryType",
          date: "$date",
          currency: { $first: "$currency" },
          invoiceDate: "$order_invoiceDate",
          invoiceNo: "$order_invoiceNo",
          contactDetail: { $first: "$contactDetail" }
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
        $sort: {
          createdAt: -1
        }
      }
    ]);
    res.json(orders);

/*     let userorders = await pickupPoint_Order
      .find({ user: id })
      .populate("products.product")
      .populate({ path: "user" })
      .populate("language currency")
      .populate("Seller")
      .populate("Payment_Status")
      .populate("products.pickupPoints")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .sort({ createdAt: -1 });
    userorders.forEach((userorder) => {
      d = userorder.createdAt;
      userorder.createdAt =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    });
    res.json(userorders);
 */  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: req.body.orderStatus,
        paymentIntent: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const sellerUpdateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: req.body.orderStatus,
        paymentIntent: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let order = await pickupPoint_Order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $unwind: "$products",
      },
       {
        $lookup: {
          from: "product_tests",
          let: {
            productId: "$products.product",
            variant: "$products.variant",
            companyId: new mongoose.Types.ObjectId(req.companyId)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$$productId", "$uid"] }, { $eq: ["$$companyId", "$accCompany_id"] }],
                },
              },
            },
          ],
          as: "products.productId",
        },
      },
      {
        $unwind: "$products.productId",
      },
      {
        $unwind: "$products.productId.variations",
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  "$products.productId.variations.uid",
                  "$products.variant",
                ],
              },
              {
                $eq: [
                  "$products.productId.language_id",
                  new mongoose.Types.ObjectId(req.user.language_id),
                ],
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "_id",
          foreignField: "orderId",
          as: "orderStatus"
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
        $group: {
          _id: "$_id",
          order_referenceNo: { $first: "$order_referenceNo" },
          invoiceDate: { $first: "$order_invoiceDate"},
          invoiceNo: { $first: "$order_invoiceNo"},
          status: { $last: {$last: "$orderStatus"} },
          billing: { $first: "$billingAddress" },
          shipping: { $first: "$shippingAddress_save" },
          products: { $push: "$products" },
          currency: { $first: "$currency" },
          basePrice: { $first: "$basePrice" },
          discount: { $first: "$dicount" },
          subTotal: { $first: "$subTotal" },
          tax: { $first: "$tax" },
          discount: { $first: "$discount" },
          coupon: { $first: "$coupon_id" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          shippingCost: { $first: "$shippingCost" },
          paid: { $first: "$Paid" },
          balance: { $first: "$Balance" },
          language: { $first:  "$language" },
          currency: { $first: "$currency" },
          seller: { $first: "$seller_id" },
          deliveryType: { $first: "$deliveryType" },
          paymentStatus: { $first: "$Payment_Status" },
          timeSlot: { $first: "$timeSlot" },
          timeGroup: { $first: "$timeGroup" },
          date: { $first: "$date" },
          user_firstname:  {$first: {$first: "$user.firstname"} },
          user_lastname:  {$first: {$first: "$user.lastname"} },
          contactDetail: { $first: "$contactDetail" }          
        },
      },
      {
        $lookup: {
          from: "timeslots",
          let: { uid: "$timeSlot"},
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$$uid",
                      "$uid",
                    ],
                  },
                  {
                    $eq: [
                      "$language_id",
                      new mongoose.Types.ObjectId(req.user.language_id),
                    ],
                  },
                  {
                    $eq: [
                      "$accCompany_id",
                      new mongoose.Types.ObjectId(req.companyId)
                    ]
                  }
                ],
              },
            },
          }],
          as: "timeSlot"
        }
      },
      {
        $lookup: {
          from: "timegroups",
          let: { uid: "$timeGroup"},
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$$uid",
                      "$uid",
                    ],
                  },
                  {
                    $eq: [
                      "$language_id",
                      new mongoose.Types.ObjectId(req.user.language_id),
                    ],
                  },
                  {
                    $eq: [
                      "$accCompany_id",
                      new mongoose.Types.ObjectId(req.companyId)
                    ]
                  }
                ],
              },
            },
          }],
          as: "timeGroup"
        }
      },
      {
        $lookup: {
          from: "paymentstatusmasters",
          localField: "paymentStatus",
          foreignField: "_id",
          as: "paymentStatus"
        }
      },
      {
        $lookup: {
          from: "coupons",
          localField: "coupon",
          foreignField: "_id",
          as: "coupon",
        },
      },
      {
        $lookup: {
          from: "currencies",
          localField: "currency",
          foreignField: "_id",
          as: "currency",
        },
      },
      {
        $lookup: {
          from: "languages",
          localField: "language",
          foreignField: "_id",
          as: "language",
        },
      },
/*       {
        $lookup: {
          from: "sellers",
          localField: "seller",
          foreignField: "_id",
          as: "seller_id"
        }
      },
 */      {
        $lookup: {
          from: "orderstatusmasters",
          localField: "status.orderStatusId",
          foreignField: "_id",
          as: "status"
        }
      }
     ]);
    let seller = await Seller.findById(order[0].seller);
    order[0].seller = seller;
    res.json(order);
} catch(error) {
  throw new Error(error)
}    
});

const getOrderAdminById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    console.log(req.user.accCompany_id, req.params.id, req.user.language_id)
    if(req.type == 'User') {
      throw new Error("You must be vendor or staff or delivery boy to access this page!");
    }
    let order = await pickupPoint_Order.aggregate([
      {
        $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
            accCompany_id: new mongoose.Types.ObjectId(req.user.accCompany_id)
          },
      },
      {
        $unwind: "$products",
      },
       {
        $lookup: {
          from: "product_tests",
          let: {
            productId: "$products.product",
            variant: "$products.variant",
            companyId: new mongoose.Types.ObjectId(req.user.accCompany_id)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$$productId", "$uid"] }, { $eq: ["$$companyId", "$accCompany_id"] }],
                },
              },
            },
          ],
          as: "products.productId",
        },
      },
       {
        $unwind: "$products.productId",
      },
      {
        $unwind: "$products.productId.variations",
      },

      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  "$products.productId.variations.uid",
                  "$products.variant",
                ],
              },
              {
                $eq: [
                  "$products.productId.language_id",
                  new mongoose.Types.ObjectId(req.user.language_id),
                ],
              },
            ],
          },
        },
      },
          {
        $lookup: {
          from: "orderstatus_transactions",
          localField: "_id",
          foreignField: "orderId",
          as: "orderStatus"
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
          from: "countrymasters",
          localField: "country_id",
          foreignField: "_id",
          as: "country"
        }
      },
      {
        $unwind: {
          path: "$country",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "currencies",
          localField: "country.currency_id",
          foreignField: "_id",
          as: "currency"
        }
      },
      {
        $group: {
          _id: "$_id",
          order_referenceNo: { $first: "$order_referenceNo" },
          invoiceDate: { $first: "$order_invoiceDate"},
          invoiceNo: { $first: "$order_invoiceNo"},
          status: { $last: {$last: "$orderStatus"} },
          billing: { $first: "$billingAddress" },
          shipping: { $first: "$shippingAddress_save" },
          products: { $push: "$products" },
          currency: { $first: { $first: "$currency"} },
          basePrice: { $first: "$basePrice" },
          discount: { $first: "$dicount" },
          subTotal: { $first: "$subTotal" },
          tax: { $first: "$tax" },
          discount: { $first: "$discount" },
          coupon: { $first: "$coupon_id" },
          total: { $first: "$total" },
          grandTotal: { $first: "$grandTotal" },
          paid: { $first: "$Paid" },
          balance: { $first: "$Balance" },
          language: { $first:  "$language" },
          country: { $first: "$country" },
          seller: { $first: "$seller_id" },
          deliveryType: { $first: "$deliveryType" },
          paymentStatus: { $first: "$Payment_Status" },
          timeSlot: { $first: "$timeSlot" },
          date: { $first: "$date" },
          user_id: { $first: {$first: "$user._id"} },
          user_firstname: { $first: {$first: "$user.firstname"} },
          user_lastname: { $first: {$first: "$user.lastname"} },
          contactDetail: { $first: "$contactDetail" },
          shippingCost: { $first: "$shippingCost" },
          createdAt: { $first: "$createdAt" }
        },
      },
      {
        $lookup: {
          from: "timeslots",
          let: { uid: "$timeSlot"},
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$$uid",
                      "$uid",
                    ],
                  },
                  {
                    $eq: [
                      "$language_id",
                      new mongoose.Types.ObjectId(req.user.language_id),
                    ],
                  },
                  {
                    $eq: [
                      "$accCompany_id",
                      new mongoose.Types.ObjectId(req.user.accCompany_id)
                    ]
                  }
                ],
              },
            },
          }],
          as: "timeSlot"
        }
      },
      {
        $lookup: {
          from: "paymentstatusmasters",
          localField: "paymentStatus",
          foreignField: "_id",
          as: "paymentStatus"
        }
      },
      {
        $lookup: {
          from: "coupons",
          localField: "coupon",
          foreignField: "_id",
          as: "coupon",
        },
      },
      {
        $lookup: {
          from: "languages",
          localField: "language",
          foreignField: "_id",
          as: "language",
        },
      },
      {
        $lookup: {
          from: "sellers",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller_id"
        }
      },
      {
        $lookup: {
          from: "orderstatusmasters",
          localField: "status.orderStatusId",
          foreignField: "_id",
          as: "status"
        }
      }
     ]);
      let seller = await Seller.findById(order[0]?.seller);
      order[0].seller = seller;
       if(req.type == 'Staff') {
        res.json(order);
      }
       else if(req.type == 'Seller' && String(seller?._id) == String(req.user._id)) {
        res.json(order);
      }
      else if(req.type == 'Delivery') {
        let assign = await AssignDeliveryBoy.findOne({ accCompany_id: req.companyId, orderId: req.params.id, deliveryBoy: req.user._id, approve: true });
        if(assign == null) {
          throw new Error("You are not allowed to access this page");
        }
        else {
          res.json(order);
        }
      }
      else {
        throw new Error("You are not allowed to access this page");
      }
 
  } catch(error) {
  throw new Error(error)
}    
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    let products = [];
    let token;
    if(req.user._id == undefined && req.body.contactDetail == undefined) {
      throw new Error("Contact Detail is a must!");
    }

    if (req.query.products != "" && req.query.products != "undefined") {
      token = jwt.verify(req.query.products, process.env.JWT_SECRET)?.token;
      let client = await Client.get(token);
      products = JSON.parse(client);
    } 
    else if(req.query.products == "") {
      throw new Error("Something went wrong")
    }
    else if (req.cookies.products != undefined && req.cookies.products != "undefined") {
      let cart = req.cookies.products;
      cart.forEach((produ) => {
        if(String(produ.country_id) == String(req.companyId)) {
          products = produ.value;
        }
      })
    }
    
    let coupon = undefined;
    if (req.query.coupon != "" && req.query.coupon != "undefined") {
      let couponCheck = req.query.coupon;
      coupon = jwt.verify(coupon, process.env.JWT_SECRET).coupon;
    }
    else if(req.query.coupon == "") {

    }
    else if (req.cookies.coupon != undefined && req.cookies.coupon != "undefined") {
      let couponCheck = req.cookies.coupon;
      couponCheck?.forEach((produ) => {
        if(String(produ.country_id) == String(req.companyId)) {
          coupon = produ.value;
        }
      })
    }

    let setting;
    let shipCost;
/*     if(cart.grandTotal > 0) {
      setting = await ShippingSettings.findOne({ accCompany_id: req.companyId, country_id: req.user.country_id });
      if(setting!=null && setting.minPrice > cart.grandTotal) {
        if(req.body.shipId == undefined || req.body.shipId == "null" || req.body.shipId == null) {
          req.body.shipId = setting.defaultShip;
        }
        shipCost = await ShippingPrice.findOne({ accCompany_id: req.companyId, country_id: req.user.country_id, _id: req.body.shipId })
        cart.shippingCost = shipCost.price;
        cart.grandTotal += shipCost.price;
      }
    }
 */

    setting = await ShippingSettings.findOne({ accCompany_id: req.companyId, country_id: req.user.country_id });
    if(setting!=null) {
      if(req.body.shipId == undefined || req.body.shipId == "null" || req.body.shipId == null ) {
        console.log("setting",setting, setting.defaultShip)
        req.body.shipId = setting.defaultShip;
      }
      shipCost = await ShippingPrice.findOne({ accCompany_id: req.companyId, country_id: req.user.country_id, _id: req.body.shipId })
    }

    let originalProduct = [];
    let wholesaleProduct = [];
    let generalSetting = await Client.get(`GeneralSetting:${req.companyId}:64882bf65ec65f7ca4cf04bf`);
    if(generalSetting == null) {
      generalSetting = await GeneralSetting.findOne({ accCompany_id: req.companyId, parent_id: "64882bf65ec65f7ca4cf04bf" });
      await Client.set(`GeneralSetting:${req.companyId}:64882bf65ec65f7ca4cf04bf`, JSON.stringify(generalSetting));
    }
    else {
      generalSetting = JSON.parse(generalSetting);
    }


    products?.forEach((product) => {
      console.log(req.companyId, product.productId, req.user.language_id);

      originalProduct.push(
        Product.findOne({
          accCompany_id: req.companyId,
          uid: product.productId,
          language_id: req.user.language_id,
        }).lean()
      );
      wholesaleProduct.push(
        WholesalePrice.findOne({
          "products.product_id": product.productId,
          "products.variant_id": product.variantId,
          "products.sku": product.sku,
          seller_id: product.seller_id,
          currency_id: req.user.currency_id,
          accCompany_id: req.companyId,
        }).lean());
    });

    Promise.all(originalProduct).then((productList) => {
      let prices = [];
      products.forEach((product) => {
          productList?.forEach((orignalProd) => {
            if (product.productId == orignalProd?.uid) {
              orignalProd.variations.forEach((variant) => {
                if (variant.uid == product.variantId) {
                  product.variant = variant;
                }
              });
              product.productId = orignalProd;
              prices.push(
                ProductCostVariation.findOne({
                  product_id: product.productId._id,
                  variant_id: product.variant._id,
                  seller_id: product.seller_id,
                  country_id: req.user.country_id,
                }).lean()
              );    
            }
          });
        });

        Promise.all(prices).then(async (priceList) => {
          Promise.all(wholesaleProduct).then(async (wholesalePrices) => {
            products.forEach((product) => {
              priceList.forEach((price) => {
              if (
                String(price?.product_id) == String(product?.productId?._id) &&
                String(price?.variant_id) == String(product?.variant?._id) &&
                String(price?.seller_id) == String(product.seller_id) &&
                String(price.sku) == String(product.sku)
              ) {
                product.price = price;
              }
            });
            wholesalePrices?.forEach((wholesale) => {
              wholesale?.products?.forEach((wholePrice) => {
                wholePrice?.wholesale?.forEach((wholeRate) => {
                  if(String(wholePrice.product_id) == String(product?.productId?.uid) &&
                  String(wholePrice.variant_id) == String(product?.variantId) &&
                  String(wholesale.seller_id) == String(product.seller_id) &&
                  String(wholePrice.sku) == String(product.sku) &&
                  product.qty >= wholeRate.min_qty &&
                  product.qty <= wholeRate.max_qty
                  )
                  {
                    product.wholesale = wholeRate;
                  }  
                })
              })
            });
          });
          let couponStat;
          if (coupon != undefined) {
            couponStat = await Coupon.findOne({ _id: coupon });
          }
          
          
          
          let sellerList = [];
          let pickList = [];

          products.forEach((product) => {
            if(product.deliveryType.toUpperCase() == "HOME DELIVERY") {
              let found = false;
              sellerList.forEach((seller) => {
                if(String(seller) == String(product.seller_id)) {
                  found = true;
                }
              });

              if(!found) {
                sellerList.push(product.seller_id);
              }
            }
          });

          let cartList = [];


          sellerList.forEach((seller) => {
              let productList= [];
              let cartProduct = [];
              //let discount= 0
              let subTotal= 0
              let tax= 0
              let total= 0
            products.forEach((product) => {
              if(String(seller) == String(product.seller_id)) {
                productList.push(product);
              }
            });

            productList.forEach((product) => {
              if(product.wholesale != undefined) {
                product.price.sale_rate = product.wholesale.sale_price;
              }
/*               if(generalSetting?.inventoryControl =="From Product Detail") {
                if(product.qty > product.productId.total_quantity) {
                  throw new Error("Out of Stock");
                }
                if(product.qty < product.productId.minimum_order_qty) {
                  throw new Error("Must be greater then " + product.minimum_order_qty);
                }  
              }
           
 */              if (product?.price?.tax_type == "Inclusive") {
                product.subTotal = product?.price?.sale_rate * product.qty;
                let tt = 100 + product?.price?.tax;
                let tax1 = Number((product?.subTotal * 100) / tt).toFixed(2);
                product.tax = Number(product?.subTotal - Number(tax1)).toFixed(2);
                let ttPer = 100 + product?.price?.tax;
                let tax1Per = Number(
                  (product?.price?.sale_rate * 100) / ttPer
                ).toFixed(2);
                product.price.sale_rate = tax1Per;
                //product.price.sale_rate -= Number(product.tax);
                product.subTotal = Number(Number(tax1).toFixed(2));
                product.price.sale_rate = Number(
                  Number(product.subTotal / product.qty).toFixed(2)
                );
              } else {
                product.tax = Number(
                  Number(
                    (product.price.tax * product.price.sale_rate * product.qty) /
                      100
                  ).toFixed(2)
                );
              }
              product.total = Number(
                Number(Number(product.subTotal) + Number(product.tax)).toFixed(2)
              );
              subTotal = Number(Number(subTotal.toFixed(2)) + Number(Number(product.subTotal).toFixed(2)));
              tax += Number(product.tax);
              total += product.total;
              cartProduct.push({
                name: product.productId.name,
                mainImage_url: product.productId.mainImage_url,
                variant: product.variant,
                price: product.price,
                qty: product.qty,
                subtotal: product.subTotal,
                tax: product.tax,
                shippingCost: 0,
                total: product.total,
              });
            });
            let discount = 0;
            let baseTax = tax;
            let basePrice = subTotal;
            
            if (couponStat != null) {
              let currentDate = new Date();
              let couponApplied = false;
              if (
                couponStat != undefined &&
                couponStat.start_date < new Date() &&
                couponStat.end_date > new Date()
              ) {
                couponApplied = true;
              } else {
                couponStat = undefined;
              }
  
              if (couponApplied) {
                if (couponStat.discount_type == "Amount") {
                  let items = 0;
                  productList.forEach((product) => {
                    items += product.qty;
                  });
  
                  discount = cart.discount / items;
  
                  productList.forEach((product) => {
                    product.actualTotal = product.total - discount;
                  });
                } else if (couponStat.discount_type == "Percent") {
                  discount = Number(
                    (couponStat.discount * basePrice) / 100
                  ).toFixed(2);
                  baseTax = Number(
                    Number(baseTax) -
                      (couponStat.discount * Number(baseTax)) / 100
                  ).toFixed(2);
  
                  productList.forEach((product) => {
                    product.actualTotal =
                      product.total -
                      Number(
                        Number(
                          (couponStat.discount * product.subTotal) / 100
                        ).toFixed(2)
                      ) -
                      Number(
                        Number(
                          (couponStat.discount * product.tax) / 100
                        ).toFixed(2)
                      );
                  });
                }
              }
            }
            discount = Number(discount);
            basePrice = subTotal;
            subTotal = Number(Number(Number(subTotal).toFixed(2))) - Number(Number(Number(discount)).toFixed(2));
            //        cart.tax = baseTax;
            //cart.total = cart.subTotal + cart.tax;
            grandTotal =
              Number(Number(subTotal).toFixed(2)) +
              Number(Number(tax).toFixed(2));
            let shippingCost = 0;
            if(setting!=null && setting.minPrice > grandTotal && (shipCost != null || shipCost!= undefined )) {
                shippingCost = shipCost.price;
                grandTotal += shipCost.price;
            }

              cartList.push({
              products: productList,
              coupon_id: couponStat,
              seller_id: seller,
              country_id: req.user.country_id,
              currency: req.user.currency_id,
              deliveryType: "Home Delivery",
              timeSlot: req.body.timeSlot,
              date: req.body.date,
              discount: discount,
              basePrice: basePrice,
              subTotal: subTotal,
              tax: tax,
              total: total,
              shippingCost: shippingCost,
              grandTotal: grandTotal
            });
          });


          let orders = [];
          cartList.forEach((cart) => {
            if(req.body.shipping_Address == undefined || req.body.shipping_Address == null) {
              req.body.shipping_Address = req.body.billAddress
            }

            cart.products.forEach((product)=> {
              product.product = product.productId.uid;
              product.variant = product.variant.uid;
              product.productId = undefined;
              product.variantId = undefined;
            });

            orders.push(pickupPoint_Order.create({
              ...cart,
              contactDetail: req.body?.contactDetail,
              name: req.body.name,
              mobile: req.body.email,
              billingAddress: req.body?.billAddress,
              shippingAddress_save: req.body?.shipping_Address,
              date: req.body.date,
              timeSlot: req.body.timeSlot,
              timeGroup: req.body.timeGroup,
              language: req.user.language_id,
              currency: req.user.currency_id,
              user: req.user?._id,
              country_id: req.user.country_id,
              accCompany_id: req.companyId
            }));
          })


          Promise.all(orders).then(async (orderList) => {
            let orderStatus = [];
            orderList.forEach((order) => {
              orderStatus.push(orderStatusTransaction.create({
                orderId: order._id,
                orderStatusId: "6423edb20944088884f88cca",
              }));  
            })
            Promise.all(orderStatus).then(async (result) => {
              const country = await Country.findById(req.user.country_id);
              const currency = await Currency.findById(country?.currency_id);       
              await Client.del([token]);
              res.json({orderList, currency });                   
              
            }).catch((error) => {
              throw new Error(error);
            });
          }).catch((error) => {
            throw new Error(error);
          });
        }).catch((error) => {
          throw new Error(error);
        });;
    }).catch((error) => {
      throw new Error(error);
    });
  }).catch((error) => {
        throw new Error(error);
      });;
  } catch (error) {
    throw new Error(error);
  }
});

const createOrderMobile = asyncHandler(async (req, res) => {
  try {
    let user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.body.userid),
        },
      },
      {
        $lookup: {
          from: "product_tests",
          localField: "cart.products.product",
          foreignField: "_id",
          as: "cartProduct",
        },
      },
      {
        $lookup: {
          from: "wholesaleproductcosts",
          localField: "cart.products.product",
          foreignField: "productId",
          as: "wholesale",
        },
      },
      {
        $lookup: {
          from: "pickup_points",
          localField: "cart.products.pickupPoints",
          foreignField: "_id",
          as: "pickup",
        },
      },
      {
        $lookup: {
          from: "combodeals",
          localField: "cart.products.product._id",
          foreignField: "product.productId",
          as: "combos",
        },
      },
      {
        $lookup: {
          from: "coupons",
          localField: "cart.coupon_id",
          foreignField: "_id",
          as: "coupon",
        },
      },
    ]);

    user = user[0];
    let coupon = user.coupon[0];
    let subComboHome = 0;

    if (user.combos.length > 0) {
      user.combos.forEach((combo) => {
        combo.noOfFoundHome = 0;
        combo.minComboQty = null;
        combo.products.forEach((product) => {
          user.cart.products.forEach((cart) => {
            if (
              String(product.productId) == String(cart.product._id) &&
              String(product.variant) == String(cart.variant) &&
              String(cart.deliveryType == "HOME DELIVERY")
            ) {
              combo.noOfFoundHome += 1;

              if (combo.minComboQty == null) {
                combo.minComboQty = cart.count;
              } else if (combo.minComboQty > cart.count) {
                combo.minComboQty = cart.count;
              }
            }
          });
        });
        if (combo.noOfFoundHome == combo.products.length) {
          combo.products.forEach((product) => {
            user.cart.products.forEach((cart) => {
              if (
                String(product.productId) == String(cart.product._id) &&
                String(product.variant) == String(cart.variant) &&
                String(cart.deliveryType) == "HOME DELIVERY"
              ) {
                cart.comboHome = true;
                product.comboHome = true;
                cart.comboQty = combo.minComboQty;
              }
            });
          });
          subComboHome += combo.offer_Price * combo.minComboQty;
        }
      });
    }

    user.cart.products.forEach((product) => {
      product.wholesalePrice = user.wholesale.find((prod) => {
        if (String(prod.productId) == String(product.product)) {
          return prod;
        }
      });
      product.product = user.cartProduct.find((prod) => {
        if (String(prod._id) == String(product.product)) {
          return prod;
        }
      });
      product.pickupPoints = user.pickup.find((prod) => {
        if (String(prod._id) == String(product.pickupPoints)) {
          return prod;
        }
      });
    });

    user.cart.coupon_id = user.coupons;

    //await orders.save();
    //       if(req.body.paymentMethod == "EMI") {

    if (user != null) {
      if (user.cart.length == 0) {
        throw new Error("Nothing in cart");
      }
      if (user.cart.length == 0) {
        throw new Error("Cart is Empty");
      }
      req.body.shipping_Address = await ShippingAddress.findById(
        req.body.shippingAddress_id
      );
      req.body.billAddress = await ShippingAddress.findById(
        req.body.billingAddress_id
      );

      let shipping_address;
      if (req.body.shipping_Address != undefined) {
        shipping_address = {
          country: req.body.shipping_Address.country,
          state: req.body.shipping_Address.state,
          city: req.body.shipping_Address.city,
          zip: req.body.shipping_Address.zip,
          addressLine1: req.body.shipping_Address.addressLine1,
          addressLine2: req.body.shipping_Address.addressLine2,
          landmark: req.body.shipping_Address.landmark,
          province: req.body.shipping_Address.province,
          phone: req.body.shipping_Address.phone,
          email: req.body.shipping_Address.email,
        };
      } else {
        shipping_address = {
          country: req.body.billAddress.country,
          state: req.body.billAddress.state,
          city: req.body.billAddress.city,
          zip: req.body.billAddress.zip,
          addressLine1: req.body.billAddress.addressLine1,
          addressLine2: req.body.billAddress.addressLine2,
          landmark: req.body.billAddress.landmark,
          province: req.body.billAddress.province,
          phone: req.body.billAddress.phone,
          email: req.body.billAddress.email,
        };
      }
      console.log(req.body.billAddress);

      let billingAddress = {
        bcountry: req.body.billAddress?.country,
        bstate: req.body.billAddress?.state,
        bcity: req.body.billAddress?.city,
        bzip: req.body.billAddress.zip,
        baddressLine1: req.body.billAddress?.addressLine1,
        baddressLine2: req.body.billAddress?.addressLine2,
        blandmark: req.body.billAddress?.landmark,
        bprovince: req.body.billAddress?.province,
        bphone: req.body.billAddress?.phone,
        bemail: req.body.billAddress?.email,
      };

      
      let ship = await new ShippingAddress(billingAddress);
      let homeDelivery = false;
      let pickupPoints = false;
      let pickupPointsList = [];
      //      let deliveryType = "Home";
      let Seller = [];
      let overSelling = await GeneralSetting.findById(
        "64882e43c2b806ddd3050c01"
      );
      user.cart.products.forEach((product) => {
        if (product.product == null) {
          throw Error("Product not found in cart!");
        }
      });
      let subTotal = 0;
      let shippingCost = 0;
      let total = 0;
      let tax = 0;
      let invoice_Home1 = [];
      user.cart.products.forEach(async (product) => {
        product.product.variations.forEach(async (variant) => {
          if (String(variant._id) == String(product.variant)) {
            let sale_rate = variant;
            let sku = variant.sku;
            if (
              variant?.variation_price?.length != 0 &&
              product.deliveryType != "Pickup Point Delivery"
            ) {
              variant?.variation_price?.forEach((var_price) => {
                if (
                  var_price.sku == product.sku &&
                  String(var_price.seller_id) == String(product.seller_id)
                ) {
                  sale_rate = var_price;
                  let found = false;
                  Seller.forEach((seller) => {
                    if (String(seller) == String(var_price.seller_id)) {
                      found = true;
                    }
                  });
                  if (!found) {
                    Seller.push(var_price.seller_id);
                  }
                }
              });
            } else if (product.deliveryType == "Pickup Point Delivery") {
              let found = false;
              if (!overSelling.OverSelling) {
                let productStockQty = await ProductStock.find({
                  product_id: product.product,
                  variant_id: product.variant,
                  sku: product.sku,
                  pickupPoint_id: product.pickupPoints,
                });

                let qty = 0;
                if (productStockQty.length > 0) {
                  productStockQty.forEach((product) => {
                    if (product.qty != undefined) {
                      if (product.trans_type == "credit") {
                        qty += product.qty;
                      } else {
                        qty -= product.qty;
                      }
                    }
                  });
                }

                if (qty > 0) {
                  throw new Error("Product is out of stock!");
                }
              }

              Seller.forEach((seller) => {
                if (String(seller) == String("64269f0df127906d53878d3d")) {
                  found = true;
                }
              });
            }
            let wholesale = product.wholesalePrice;
            if (wholesale != undefined && wholesale != null) {
              wholesale.products.forEach((prod) => {
                if (
                  (String(prod.product_id) == String(product.product._id),
                  String(prod.variant_id) == String(product.variant),
                  String(prod.sku) == String(product.sku))
                ) {
                  prod.wholesale.forEach((whole) => {
                    if (
                      whole.min_qty <= product.count &&
                      whole.max_qty >= product.count
                    ) {
                      sale_rate.sale_rate = whole.sale_price;
                    }
                  });
                }
              });
              //wholesale[0].products.wholesale.sale_price;
            }
            if (!product.comboHome) {
              subTotal += sale_rate.sale_rate * product.count;
            } else {
              let count = product.count - product.comboQty;
              if (count > 0) {
                subTotal += sale_rate.sale_rate * count;
              }
            }
            product.taxPer = variant.tax;
            product.shippingCost = 0;
            if (product.deliveryType == "HOME DELIVERY") {
              shippingCost += product.product.shipping_cost;
              product.shippingCost = product.product.shipping_cost;
              homeDelivery = true;
              invoice_Home1.push(product);
            } else {
              product.shippingCost = 0;
              pickupPoints = true;
              let picks = false;
              pickupPointsList.forEach((pick) => {
                if (String(product.pickupPoints) == String(pick)) {
                  picks = true;
                }
              });
              if (!picks) {
                pickupPointsList.push(product.pickupPoints);
              }
            }
            product.variant_weight = variant.weight;
            //            if (!product.comboHome) {
            product.subTotal = sale_rate.sale_rate * product.count;
            /*             } else {
              let count = product.count - product.comboQty;
              if (count > 0) {
                product.subTotal = sale_rate.sale_rate * count;
              } else {
                product.subTotal = 0;
              }
            }
 */
            product.sale_rate = sale_rate.sale_rate;
            product.tax_type = sale_rate.tax_type;
            //            product.subTotal = sale_rate.sale_rate * product.count;
            let count;
            if (!product.comboHome) {
              count = product.count;
              subTotal += sale_rate.sale_rate * product.count;
            } else {
              count = product.count - product.comboQty;
              if (count > 0) {
                subTotal += sale_rate.sale_rate * count;
              }
            }

            if (sale_rate.tax_type == "Inclusive") {
              product.subTotal = sale_rate.sale_rate * product.count;
              let tt = 100 + sale_rate.tax;
              let tax1 = (product.subTotal * 100) / tt;
              product.tax = Number(product.subTotal - tax1).toFixed(2);
              product.subTotal = Number(tax1).toFixed(2);

              tax += Number(product.tax);

              //              subTotal -= product.tax;
            } else {
              tax += (sale_rate.tax * count * sale_rate.sale_rate) / 100;
              product.tax = (sale_rate.tax * count * sale_rate.sale_rate) / 100;
            }
            product.subTotal = Number(product.subTotal);
            product.tax = Number(product.tax);
            product.shippingCost = Number(product.shippingCost);
            product.total = Number(
              Number(
                Number(product.subTotal) +
                  Number(product.tax) +
                  Number(product.shippingCost)
              ).toFixed(2)
            );
          }
        });
      });
      let pickupPointsNewMode = [];
      if (pickupPoints) {
        let count = 0;
        let invoice_check = false;
        let Total = 0;
        let SubTotal = 0;
        let Tax = 0;
        let GrandTotal = 0;
        let ShippingCost = 0;
        let invoice1 = {
          products: [],
        };

        pickupPointsList.forEach((pick) => {
          let pickTotal = 0;
          let pickSubTotal = 0;
          let pickTax = 0;
          let pickGrandTotal = 0;
          let Seller = "64269f0df127906d53878d3d";
          user.cart.products.forEach((product) => {
            if (String(product.pickupPoints) == String(pick)) {
              product.product.variations.forEach((variant) => {
                if (String(variant._id) == String(product.variant)) {
                  pickSubTotal += variant.sale_rate * product.count;
                  product.variant_weight = variant.weight;
                  product.sale_rate = variant.sale_rate;
                  product.tax_type = variant.tax_type;
                  product.subTotal = variant.sale_rate * product.count;
                  if (variant.tax_type == "Inclusive") {
                    product.subTotal = variant.sale_rate * product.count;
                    let tt = 100 + variant.tax;
                    let tax1 = (product.subTotal * 100) / tt;
                    product.tax = Number(
                      Number(product.subTotal - tax1).toFixed(2)
                    );
                    product.subTotal = Number(Number(tax1).toFixed(2));

                    pickSubTotal -= Number(product.tax);
                    pickTax += product.tax;
                  } else {
                    pickTax +=
                      (variant.tax * product.count * variant.sale_rate) / 100;
                    product.tax =
                      (variant.tax * product.count * variant.sale_rate) / 100;
                  }
                  product.total =
                    Number(product.subTotal) + Number(product.tax);
                  invoice1.products.push(product);
                  invoice1.pickupAddress = pick;
                }
              });
            }
          });
          invoice1.subTotal = Number(pickSubTotal);
          invoice1.basePrice = Number(invoice1.subTotal);
          invoice1.tax = Number(pickTax);
          invoice1.total = pickSubTotal + pickTax;
          invoice1.grandTotal = pickSubTotal + pickTax;
          invoice1.Seller = Seller;
          invoice1.deliveryType = "Pickup From Store";
          let discount = 0;
          if (user.cart.coupon_id != null) {
            let currentDate = new Date();
            if (
              currentDate - user.cart.coupon_id.start_date > 0 &&
              user.cart.coupon_id.end_date - currentDate > 0
            ) {
              if (coupon.discount_type == "Amount") {
                discount = coupon.discount;
              } else if (coupon.discount_type == "Percent") {
                discount = Math.trunc(
                  (coupon.discount * invoice1.basePrice) / 100
                );
                invoice1.tax -= (coupon.discount * invoice1.tax) / 100;
              }
              invoice1.coupon_id = user.cart.coupon_id._id;
            }
          }
          invoice1.discount = discount;
          invoice1.grandTotal -= discount;
          pickupPointsNewMode.push(invoice1);
          pickupPointsNewMode.pickupAddress = invoice1.pickupAddress;
          invoice1 = {
            products: [],
            subTotal: 0,
            tax: 0,
            total: 0,
            grandTotal: 0,
            discount: 0,
          };
        });
      }
      let discount = 0;

      let SellersInvoice = [];
      if (Seller.length > 0) {
        Seller.forEach((seller) => {
          let SellerInvoice = {
            Seller: seller,
            products: [],
            subTotal: 0,
            shippingCost: 0,
            total: 0,
            grandTotal: 0,
            tax: 0,
          };
          user.cart.products.forEach((product) => {
            if (
              product.seller_id == String(seller) &&
              product.deliveryType == "HOME DELIVERY"
            ) {
              SellerInvoice.products.push(product);
              SellerInvoice.subTotal += Number(product.subTotal);
              SellerInvoice.tax += Number(product.tax);
              SellerInvoice.shippingCost += Number(product.shippingCost);
              SellerInvoice.grandTotal +=
                Number(product.subTotal) +
                Number(product.tax) +
                Number(product.shippingCost);
            }
          });
          SellerInvoice.basePrice = SellerInvoice.subTotal;
          if (user.cart.coupon_id != null) {
            let currentDate = new Date();
            if (
              currentDate - user.cart.coupon_id.start_date > 0 &&
              user.cart.coupon_id.end_date - currentDate > 0
            ) {
              if (coupon.discount_type == "Amount") {
                discount = coupon.discount;
              } else if (coupon.discount_type == "Percent") {
                discount = Number(
                  Number(
                    (coupon.discount * SellerInvoice.basePrice) / 100
                  ).toFixed(2)
                );
                SellerInvoice.tax -= Number(
                  (coupon.discount * SellerInvoice.tax) / 100
                ).toFixed(2);
              }
            }
          }
          SellerInvoice.subTotal = Number(SellerInvoice.basePrice) - discount;
          SellersInvoice.push(SellerInvoice);
          SellerInvoice = [];
        });
      }

      if (user.cart.coupon_id != null) {
        let currentDate = new Date();
        if (
          currentDate - user.cart.coupon_id.start_date > 0 &&
          user.cart.coupon_id.end_date - currentDate > 0
        ) {
          if (user.cart.coupon_id.discount_type == "Amount") {
            discount = user.cart.coupon_id.discount;
          } else if (user.cart.coupon_id.discount_type == "Percent") {
            discount = Math.trunc((user.cart.coupon_id.discount * total) / 100);
          }
        }
      }
      total = subTotal + tax;
      let grandTotal = total + shippingCost - discount;

      let orders = await new Order({
        user: req.body.userid,
        subTotal: subTotal,
        shippingCost: shippingCost,
        tax: tax,
        discount: discount,
        grandTotal: total - discount,
        total: total,
      });

      let pickOrders = [];
      if (pickupPointsNewMode.length > 0) {
        pickupPointsNewMode.forEach(async (pickup) => {
          let order_pick = new pickupPoint_Order(pickup);
          orders.parent_id = orders._id;
          order_pick.language = user.language;
          order_pick.currency = user.currency;
          pickOrders.push(order_pick);

          orders.childOrderId.push(order_pick._id);
        });
      }

      let homeOrder = new pickupPoint_Order();
      if (invoice_Home1.length > 0) {
        homeOrder.currency = user.currency;
        homeOrder.language = user.language;
        homeOrder.parent_id = orders._id;
        let homeSubTotal = 0;
        let hometax = 0;
        let hometotal = 0;
        let homeshippingCost = 0;
        let homegrandTotal = 0;
        let Seller = [];

        invoice_Home1.forEach((home) => {
          if (home.seller_id == undefined) {
            Seller.push("64269f0df127906d53878d3d");
          } else {
            Seller.push(home.seller_id);
          }
          if (!home.comboHome) {
            homeSubTotal += home.subTotal;
          } else {
            let count = home.count - home.comboQty;
            let subtt = home.sale_rate * count;
            homeSubTotal += subtt;
          }
          if (!home.comboHome) {
            hometax += home.tax;
          } else {
            let count = home.count - home.comboQty;
            let subtt = home.sale_rate * count;
            if (home.tax_type == "Inclusive") {
              let tax = Number(
                Number(home.taxPer * home.count * home.sale_rate) / 100
              ).toFixed(2);
              home.subTotal -= tax;
            } else {
              let tax = Number(
                Number(
                  (home.taxPer * home.count * home.sale_rate) / 100
                ).toFixed(2)
              );
              home.subTotal += tax;
            }
            home.subTotal = Number(Number(home.subTotal).toFixed(2));
          }

          if (!home.comboHome) {
            hometotal += Number(home.tax) + Number(home.subTotal);
          }
          homeshippingCost += home.shippingCost;
        });
        homeOrder.products = invoice_Home1;
        homeOrder.subTotal = Number(homeSubTotal) + Number(subComboHome);

        homeOrder.subTotal = Number(Number(homeOrder.subTotal).toFixed(2));
        homegrandTotal =
          Number(homeOrder.subTotal) +
          Number(hometax) +
          Number(homeshippingCost);
        homeOrder.tax = Number(Number(hometax).toFixed(2));
        homeOrder.shippingCost = homeshippingCost;
        homeOrder.total = Number(homeOrder.subTotal) + Number(hometax);
        homeOrder.Seller = Seller;

        homeOrder.basePrice = Number(homeOrder.subTotal);
        let discount = 0;
        if (coupon != null) {
          let currentDate = new Date();
          if (
            currentDate - coupon.start_date > 0 &&
            coupon.end_date - currentDate > 0
          ) {
            if (coupon.discount_type == "Amount") {
              discount = coupon.discount;
            } else if (coupon.discount_type == "Percent") {
              discount = Number(
                Number((coupon.discount * homeOrder.basePrice) / 100).toFixed(2)
              );
              homeOrder.tax -= Number(
                Number((coupon.discount * homeOrder.tax) / 100).toFixed(2)
              );
            }
            homeOrder.coupon_id = coupon._id;
          }
        }
        homeOrder.discount = Number(discount);

        homeOrder.subTotal = Number(homeOrder.subTotal) - Number(discount);

        homeOrder.subTotal = Number(Number(homeOrder.subTotal).toFixed(2));

        homeOrder.tax = Number(Number(homeOrder.tax).toFixed(2));
        homeOrder.grandTotal = Number(
          Number(
            Number(homeOrder.subTotal) +
              Number(homeOrder.tax) +
              Number(homeOrder.shippingCost)
          ).toFixed(2)
        );
        homeOrder.deliveryType = "Home Delivery";
        orders.childOrderId.push(homeOrder._id);

        let orderStatusTrans = await new orderStatusTransaction({
          orderId: homeOrder._id,
          orderStatusId: "6423edb20944088884f88cca",
          userid: req.body.userid,
        });
        homeOrder.orderStatusTrans = orderStatusTrans._id;
        await orderStatusTrans.save();
      }
      if (req.body.billAddress_Active == true && req.body.billing_id != "") {
        let shipp = await ShippingAddress.findById(req.body.billing_id);
        orders.billingAddress = shipp;
        homeOrder.billingAddress = shipp;
      }

      orders.billingAddress = billingAddress;
      console.log(req.body.billAddress);
      if (req.body.shipping_Address != undefined) {
        orders.shippingAddress_save = req.body.shipping_Address;
        homeOrder.shippingAddress_save = req.body.shipping_Address;
      } else {
        homeOrder.shippingAddress_save = {
          country: req.body.billAddress.country,
          state: req.body.billAddress.state,
          city: req.body.billAddress.city,
          zip: req.body.billAddress.zip,
          addressLine1: req.body.billAddress.addressLine1,
          addressLine2: req.body.billAddress.addressLine2,
          landmark: req.body.billAddress.landmark,
          province: req.body.billAddress.province,
          phone: req.body.billAddress.phone,
          email: req.body.billAddress.email,
        };
      }
      homeOrder.billingddress_save = ship;
      homeOrder.user = req.body.userid;
      homeOrder.billingAddress = billingAddress;
      if (req.body.shipping_Address != undefined) {
        homeOrder.shippingAddress_save = req.body.shipping_Address;
      }

      if (
        homeOrder.products.length > 0 &&
        invoice_Home1.length > 0 &&
        (SellersInvoice.length == 1 || SellersInvoice.length == 0)
      ) {
        homeOrder.products.forEach(async (product) => {
          let clubPointUser = new ClubPointsUsers({
            seller_id: product.seller_id,
            sku: product.sku,
            order_id: homeOrder._id,
            product_id: product,
            product_qty: product.count,
            point: product.count,
            user_id: req.body.userid,
          });
          //      await clubPointUser.save();
        });
        homeOrder.language = user.language;
        homeOrder.currency = user.currency;
        await homeOrder.save();

        if (user.refer_code != null) {
          let orderCount = await pickupPoint_Order
            .find({ user: req.body.userid })
            .count();
          if (orderCount == 0) {
            let found = await AffiliateUser.findOne({
              refer_code: user.refer_code,
              approval: true,
            });

            if (found != null) {
              let points = await AffiliateBasic.findById(
                "647ddb9195c1f70723a0e0f8"
              );
              if (points.basic_affiliate.status) {
                let done = await AffiliateLogs.create({
                  referralUser: req.body.userid,
                  referredBy: found._id,
                  points: points.basic_affiliate.userFirst_Purchase,
                  note: "First Purchase",
                  order_Id: homeOrder._id,
                });
              }
            }
          }
        }
      }

      SellersInvoice.forEach(async (seller) => {
        let sellOrder = new pickupPoint_Order(seller);
        seller.products.forEach(async (product) => {
          let clubPointUser = new ClubPointsUsers({
            seller_id: product.seller_id,
            sku: product.sku,
            order_id: sellOrder._id,
            product_id: product,
            product_qty: product.count,
            point: product.count,
            user_id: req.body.userid,
          });
          await clubPointUser.save();
        });

        sellOrder.billingAddress = billingAddress;
        if (req.body.shipping_Address != undefined) {
          sellOrder.shippingAddress_save = req.body.shipping_Address;
        }

        let orderStatusTrans1 = await new orderStatusTransaction({
          orderId: sellOrder._id,
          orderStatusId: "6423edb20944088884f88cca",
          userid: req.body.userid,
        });
        await orderStatusTrans1.save();
        sellOrder.user = req.body.userid;
        sellOrder.orderStatusTrans = orderStatusTrans1;
        sellOrder.parent_id = orders._id;
        sellOrder.language = user.language;
        sellOrder.currency = user.currency;
        sellOrder.ipAddress = req?.body?.ipAddress;
        await sellOrder.save();
        if (user.refer_code != null) {
          let orderCount = await pickupPoint_Order
            .find({ user: req.body.userid })
            .count();
          if (orderCount == 0) {
            let found = await AffiliateUser.findOne({
              refer_code: user.refer_code,
              approval: true,
            });

            if (found != null) {
              let points = await AffiliateBasic.findById(
                "647ddb9195c1f70723a0e0f8"
              );
              if (points.basic_affiliate.status) {
                await AffiliateLogs.create({
                  referralUser: req.body.userid,
                  referredBy: found._id,
                  points: points.basic_affiliate.userFirst_Purchase,
                  note: "First Purchase",
                  order_Id: sellOrder._id,
                });
              }
            }
          }
        }
      });

      pickOrders.forEach(async (pick) => {
        pick.products.forEach(async (product) => {
          let clubPointUser = new ClubPointsUsers({
            seller_id: product.seller_id,
            sku: product.sku,
            order_id: pick._id,
            product_id: product,
            product_qty: product.count,
            point: product.count,
            user_id: req.body.userid,
          });
          await clubPointUser.save();
        });
        pick.user = req.body.userid;
        pick.parent_id = orders._id;
        pick.billingAddress = billingAddress;
        if (req.body.shipping_Address != undefined) {
          pick.shippingAddress_save = req.body.shipping_Address;
        }

        let orderStatusTrans1 = await new orderStatusTransaction({
          orderId: pick._id,
          orderStatusId: "6423edb20944088884f88cca",
          userid: req.body.userid,
        });
        await orderStatusTrans1.save();
        pick.orderStatusTrans = orderStatusTrans1;
        if (pick.grandTotal) {
        }
        await pick.save();
        if (user.refer_code != null) {
          let orderCount = await pickupPoint_Order
            .find({ user: req.body.userid })
            .count();
          if (orderCount == 0) {
            let found = await AffiliateUser.findOne({
              refer_code: user.refer_code,
              approval: true,
            });

            if (found != null) {
              let points = await AffiliateBasic.findById(
                "647ddb9195c1f70723a0e0f8"
              );
              if (points.basic_affiliate.status) {
                await AffiliateLogs.create({
                  referralUser: req.body.userid,
                  referredBy: found._id,
                  points: points.basic_affiliate.userFirst_Purchase,
                  note: "First Purchase",
                  order_Id: pick._id,
                });
              }
            }
          }
        }
      });

      /*             await EMI.create({ 
              orderId: orders.,
    
            })
          }
 */
      /*             user.cart = [];
            await user.save();
 */

      await User.findByIdAndUpdate(req.body.userid, {
        "cart.products": [],
        "cart.coupon_id": null,
      });

      let orderList = [];

      if (homeOrder.grandTotal > 0) {
        orderList.push(homeOrder._id);
      }

      if (pickOrders.length > 0) {
        pickOrders.forEach((pick) => {
          orderList.push(pick._id);
        });
      }

      if (SellersInvoice.length > 0) {
        SellersInvoice.forEach((pick) => {
          orderList.push(pick._id);
        });
      }
      res.json({
        orderList,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createOrderSingle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.body.userid).populate(
      "cart.products.product"
    );

    let seller = [];

    let shippingAddress = {
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      landmark: req.body.landmark,
      province: req.body.province,
      phone: req.body.phone,
      email: req.body.email,
      userid: req.body.userid,
    };
    let ship = await new ShippingAddress(shippingAddress);

    let orders = {
      products: [
        {
          product: req.body.product,
          variant: req.body.variant,
          count: req.body.count,
        },
      ],
      order_Status: req.body.orderStatus,
      user: req.body.userid,
      Amount: req.body.Amount,
      Delivery_Status: req.body.Delivery_Status,
      Payment_method: req.body.Payment_method,
      Payment_Status: req.body.Payment_Status,
      shippingAddress: ship._id,
    };
    if (req.body.billAddress_Active == true) {
      order.shippingAddress = req.body.billing_id;
    } else {
      orders.shippingAddress = ship;
    }

    let order = await new Order(orders).populate("products.product");
    if (order.products[0].product == undefined) {
      return res.status(404).json({ message: "Product not found!" });
    } else {
      order.Seller.push(order.products[0].product.user_id);
      let subTotal = 0;
      let shippingCost = 0;
      let tax = 0;
      let total = 0;
      let variant_fo = false;

      order.products.forEach(async (product) => {
        product.product.variations.forEach((variant) => {
          if (String(variant._id) == String(product.variant)) {
            variant_fo = true;
            subTotal += variant.sale_rate * product.count;
            order.products[0].sale_rate = variant.sale_rate;
            order.products[0].variant_weight = variant.weight;
            order.products[0].tax_type = variant.tax_type;
            if (product.deliveryType == "Home Delivery") {
              shippingCost += product.product.shipping_cost * product.count;
              order.products[0].shippingCost = shippingCost;
            } else {
              order.products[0].shippingCost = 0;
            }
            order.products[0].subTotal = subTotal;

            if (variant.tax_type == "Amount") {
              order.products[0].tax = variant.tax * product.count;
              tax += variant.tax * product.count;
            } else {
              tax += (variant.tax * product.count * variant.sale_rate) / 100;
              order.products[0].tax =
                (variant.tax * product.count * variant.sale_rate) / 100;
            }
            order.products[0].total = order.products[0].subTotal + tax;
            order.products[0].grandTotal =
              order.products[0].total + order.products[0].tax;
          }
        });
      });
      if (!variant_fo) {
        res.status(404).json({ message: "Variant not found!" });
      } else {
        total = subTotal + tax;
        order.Amount = total;
        order.total = subTotal + tax;
        order.subTotal = subTotal;
        order.tax = tax;
        order.shippingCost = shippingCost;
        order.grandTotal = total + shippingCost;
        let orderStatusTrans = await new orderStatusTransaction({
          orderId: order._id,
          orderStatusId: "6423edb20944088884f88cca",
          userid: req.body.userid,
        });
        if (!req.body.billAddress_Active) {
          await ship.save();
        }

        order.save();
        orderStatusTrans.save();
        res
          .status(200)
          .json({ total, tax, shippingCost, order, ship, orderStatusTrans });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createorder = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body.userid).populate(
      "cart.products.product"
    );
    let shippingAddress = {
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      landmark: req.body.landmark,
      province: req.body.province,
      phone: req.body.phone,
      email: req.body.email,
      userid: req.body.userid,
    };
    let ship = await new ShippingAddress(shippingAddress);
    let order = await new Order({
      user: req.body.userid,
      Seller: req.body.Seller,
      Delivery_Status: req.body.Delivery_Status,
      Payment_method: req.body.Payment_method,
      Payment_Status: req.body.Payment_Status,
      shippingAddress: ship._id,
    });
    if (req.body.billAddress_Active == true) {
      order.shippingAddress = req.body.billing_id;
    } else {
      order.shippingAddress = ship._id;
    }
    ship.orderid = order._id;
    let shippingCost = 0;
    let subTotal = 0;
    let total = 0;
    let products;
    if (req.body.cart == true) {
      user.cart.products.forEach((product) => {
        product.product.variations.forEach((variant) => {
          if (String(variant._id) == String(product.variant)) {
            subTotal += variant.sale_rate * product.count;
            shippingCost += product.product.shipping_cost * product.count;
          }
        });
      });
      products = user.cart.products;
      total = subTotal + shippingCost;
    } else {
      let product = await Product.findById(req.body.product_id);
      product.variations.forEach((variant) => {
        if (String(variant._id) == String(req.body.product_variant)) {
          subTotal += variant.sale_rate * req.body.product_count;
          shippingCost += product.shipping_cost * req.body.product_count;
        }
      });
      total = subTotal + shippingCost;
      products = [
        {
          product: product._id,
          variant: req.body.product_variant,
          count: req.body.product_count,
          pickupPoint: req.body.pickupPoint,
        },
      ];
    }
    order.products = products;
    order.Amount = total;
    if (!req.body.billAddress_Active) {
      await ship.save();
    }
    await order.save();
    res.json({ message: "Order placed!", order, ship });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOrdersById = asyncHandler(async (req, res) => {
  try {
    let order = await pickupPoint_Order.findByIdAndDelete(req.params.id);
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

/* const updateOrdersById = asyncHandler(async (req, res) => {
  try {
    let order 
  }
  catch {

  }
});
 */

const orderFilter = asyncHandler(async (req, res) => {
  try {
    let order;
    if (
      req.body.deliveryStatus != undefined &&
      req.body.Payment_Status != undefined
    ) {
      order = await Order.find({
        Delivery_Status: req.body.deliveryStatus,
        Payment_Status: req.body.Payment_Status,
      });
    } else if (
      req.body.deliveryStatus == undefined &&
      req.body.Payment_Status != undefined
    ) {
      order = await Order.find({ Payment_Status: req.body.Payment_Status });
    } else if (
      req.body.deliveryStatus != undefined &&
      req.body.Payment_Status == undefined
    ) {
      order = await Order.find({ Delivery_Status: req.body.deliveryStatus });
    } else {
      order = [];
    }
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const orderInHousePickupPointList = asyncHandler(async (req, res) => {
  try {
    let getOrderPickup = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null } })
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .populate("pickupAddress")
      .populate("products.product")
      .populate("Seller", "firstname lastname")
      .populate("user")
      .lean()
      .sort({ createdAt: -1 });
    getOrderPickup.forEach((userorder) => {
      userorder.createdAt = userorder.createdAt.toDateString();
    });
    res.json(getOrderPickup);
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointList = asyncHandler(async (req, res) => {
  try {
    let orderAssign = await OrderAssign.find({ approve: true });
    let orderIds = orderAssign?.map(({ orderId }) => {
      return orderId;
    });
    let getOrderPickup = await pickupPoint_Order
      .find({
        $or: [{ pickupAddress: { $ne: null } }, { _id: orderIds }],
      })
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .populate("pickupAddress")
      .populate("products.product")
      .populate("Seller", "firstname lastname")
      .populate("user")
      .lean()
      .sort({ createdAt: -1 });
    getOrderPickup.forEach((userorder) => {
      userorder.createdAt = userorder.createdAt.toDateString();
    });
    res.json(getOrderPickup);
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointListFilter = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let filter;
    if (req.body.pickupId == null && req.body.status != null) {
      filter = { deliveryType: "Pickup From Store" };
    } else if (req.body.pickupId != null) {
      filter = { pickupAddress: req.body.pickupId };
    }
    let getOrderPickup = await pickupPoint_Order
      .find({
        deliveryType: "Pickup From Store",
      })
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .populate("pickupAddress")
      .populate("products.product")
      .populate("Seller", "firstname lastname")
      .populate("user", "firstname lastname")
      .populate("Payment_Status")
      .sort({ createdAt: -1 });
    getOrderPickup = getOrderPickup.filter((order) => {
      if (
        String(
          order.orderStatusTrans[order.orderStatusTrans.length - 1]
            .orderStatusId._id
        ) == req.body.orderStatusId
      ) {
        return order;
      }
    });
    res.json(getOrderPickup);
  } catch (error) {
    throw new Error(error);
  }
});

const orderSellerListFilter = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let filter;
    if (req.body.sellerId == null && req.body.status != null) {
      filter = { $ne: null };
    } else if (req.body.sellerId != null) {
      filter = req.body.sellerId;
    }
    let getOrderPickup = await pickupPoint_Order
      .find({
        Seller: filter,
      })
      .populate("products.product")
      .populate("Seller", "firstname lastname")
      .populate("user", "firstname lastname")
      .populate("Payment_Status")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .lean()
      .sort({ createdAt: -1 });

    getOrderPickup = getOrderPickup.filter((order) => {
      if (
        String(
          order.orderStatusTrans[order.orderStatusTrans.length - 1]
            .orderStatusId
        ) == req.body.status
      ) {
        return order;
      }
    });
    res.json(getOrderPickup);
  } catch (error) {
    throw new Error(error);
  }
});

const orderCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointsCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointByIdCount = asyncHandler(async (req, res) => {
  try {
    let count = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
      .count();
    count += await OrderAssign.find({
      approve: true,
      pickupPoints: req.params.id,
    }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupCancelledCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
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
            order.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423dd0a2750beedd6aee260"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointsCancelledCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
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
            order.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423dd0a2750beedd6aee260"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderCancelledCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ accCompany_id: req.companyId })
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
            order.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423dd0a2750beedd6aee260"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPendingCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ accCompany_id: req.companyId })
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
            order.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423edb20944088884f88cca"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderRejectedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({accCompany_id: req.companyId})
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
            order.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423de8b2750beedd6aee271"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderDeliveredCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ accCompany_id: req.companyId })
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
            order?.orderStatusTrans[order.orderStatusTrans.length - 1]?.orderStatusId
          ) == "6423de6c2750beedd6aee26f"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPendingPickupCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
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
          ) == "6423edb20944088884f88cca"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupRejectedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
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
          ) == "6423de8b2750beedd6aee271"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupDeliveredCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
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
          ) == "6423de6c2750beedd6aee26f"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupShippedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id, accCompany_id: req.companyId })
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
          ) == "6423dea82750beedd6aee277"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickuppointsShippedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
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
          ) == "6423dea82750beedd6aee277"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderShippedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ accCompany_id: req.companyId })
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
          ) == "6423dea82750beedd6aee277"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPendingPickupPointsCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
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
          ) == "6423edb20944088884f88cca"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPoiintsRejectedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
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
          ) == "6423de8b2750beedd6aee271"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointsDeliveredCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null }, accCompany_id: req.companyId })
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
          ) == "6423de6c2750beedd6aee26f"
        ) {
          return order;
        }
      });
    }
    res.json({ count: orderList.length });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderReport = asyncHandler(async (req, res) => {
  try {
    let gt;
    let from = req.body.fromDate;
    let date = req.body.toDate;
    let orders = await pickupPoint_Order.find({
      createdAt: { $lt: from, $gt: date },
    });

    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const orderPendingPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba2175eb6d3d4914a60d",
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPartiallyPaidPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba2b75eb6d3d4914a60f",
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPaidPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba3275eb6d3d4914a611",
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error({ count: count });
  }
});

const orderPickupPendingPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba2175eb6d3d4914a60d",
        pickupAddress: req.params.id,
        accCompany_id: req.companyId,
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPartiallyPaidPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba2b75eb6d3d4914a60f",
        pickupAddress: req.params.id,
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPaidPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba3275eb6d3d4914a611",
        pickupAddress: req.params.id,
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error({ count: count });
  }
});

const orderPickupPointsPendingPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba2175eb6d3d4914a60d",
        pickupAddress: { $ne: null },
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointsPartiallyPaidPaymentCount = asyncHandler(
  async (req, res) => {
    try {
      const count = await pickupPoint_Order
        .find({
          Payment_Status: "644fba2b75eb6d3d4914a60f",
          pickupAddress: { $ne: null },
          accCompany_id: req.companyId
        })
        .count();
      res.json({ count: count });
    } catch (error) {
      throw new Error(error);
    }
  }
);

const orderPickupPointsPaidPaymentCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({
        Payment_Status: "644fba3275eb6d3d4914a611",
        pickupAddress: { $ne: null },
        accCompany_id: req.companyId
      })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error({ count: count });
  }
});

/* const orderEmiFilter = asyncHandler(async (req, res) => {
  try {

  }
  catch(error) {

  }
})
 */

const orderRefundRequest = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
});

const orderAssign = asyncHandler(async (req, res) => {
  try {
    const order = await pickupPoint_Order.findById(req.params.id);
    if (req.body.assign == null || req.body.assign.length == 0) {
      throw new Error("Please check all validations");
    } /* else if (order.orderAssign) {
      throw new Error("Order is Already assigned");
    } */ else {
      const nodup = new Set();
      req.body?.assign?.forEach((item) => {
        nodup.add(`${item.product_id}-${item.variant_id}`);
      });
      let uniqueData = Array.from(nodup).map((item) => {
        const data = item.split("-");
        return { product_id: data[0], variant_id: data[1] };
      });

      uniqueData?.forEach((data) => {
        let found = order.products.find((productOrder) => {
          if (
            String(productOrder.product) == String(data.product_id) &&
            String(productOrder.variant) == String(data.variant_id)
          ) {
            return productOrder;
          }
        });

        let qty = 0;
        let foundAssign = req.body.assign.forEach((productOrder) => {
          if (
            String(productOrder.product_id) == String(data.product_id) &&
            String(productOrder.variant_id) == String(data.variant_id)
          ) {
            qty += productOrder.qty;
          }
        });
        if (found == null || found.count != qty) {
          throw new Error("Not in Order");
        }
      });

      req.body.assign?.forEach(async (product, index) => {
        let found = order.products.find((productOrder) => {
          if (
            String(productOrder.product) == String(product.product_id) &&
            String(productOrder.variant) == String(product.variant_id)
          ) {
            return productOrder;
          }
        });
        if (found == undefined) {
          return res.json("Product is not found in order item list ");
        }

        let stocks = await PickupPointsStock.aggregate([
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $eq: [
                      "$product_id",
                      new mongoose.Types.ObjectId(product.product_id),
                    ],
                  },
                },
                {
                  $expr: { $eq: ["$sku", product.sku] },
                },
                {
                  $expr: {
                    $eq: [
                      "$pickupPoint_id",
                      new mongoose.Types.ObjectId(product.pickupPoints),
                    ],
                  },
                },
                {
                  $expr: { $eq: ["$variant_id", product.variant_id] },
                },
              ],
            },
          },
          {
            $group: {
              _id: {
                product_id: "$product_id",
                variant_id: "$variant_id",
                sku: "$sku",
                pickuppoints: "$pickupPoint_id",
              },
              credit: { $push: "$trans_type" },
              stockCredit: {
                $sum: {
                  $cond: [{ $eq: ["$trans_type", "credit"] }, "$qty", 0],
                },
              },
              stockDebit: {
                $sum: {
                  $cond: [
                    {
                      $or: [
                        { $eq: ["$trans_type", "reserve"] },
                        { $eq: ["$trans_type", "damage"] },
                        { $eq: ["$trans_type", "debit"] },
                      ],
                    },
                    "$qty",
                    0,
                  ],
                },
              },
            },
          },
          {
            $addFields: {
              totalStock: {
                $subtract: ["$stockCredit", "$stockDebit"],
              },
            },
          },
        ]);
        if (stocks.length == 0 || stocks[0].totalStock < product.qty) {
          return res.status(404).json("Product is out of stock");
        } else {
          if (req.body.assign.length - 1 == index) {
            order.orderAssign = true;
            await order.save();
            req.body.assign.forEach(async (product, index1) => {
              let test = await AssignOrder.create({
                orderId: req.params.id,
                pickupPoints: product.pickupPoints,
                productId: product.product_id,
                variant: product.variant_id,
                sku: product.sku,
                qty: product.qty,
              });

              let productStock = await ProductStock.create({
                product_id: product.product_id,
                variant_id: product.variant_id,
                qty: product.qty,
                pickupPoint_id: product.pickupPoints,
                trans_type: "reserve",
                sku: product.sku,
              });

              let productStockQty = await ProductStock.find({
                product_id: product.product_id,
                variant_id: product.variant_id,
                sku: product.sku,
                pickupPoint_id: this.pickupPoints,
              });

              let qty = 0;
              if (productStockQty.length > 0) {
                productStockQty.forEach((product) => {
                  if (product.qty != undefined) {
                    if (product.trans_type == "credit") {
                      qty += product.qty;
                    } else {
                      qty -= product.qty;
                    }
                  }
                });
              }

              let productQty = await ProductStockQty.findOne({
                product_id: product.product_id,
                variant: product.variant_id,
                pickupPoints: product.pickupPoints,
                sku: product.sku,
              });
              if (productQty == null) {
                await ProductStockQty.create({
                  product_id: product.product_id,
                  sku: product.sku,
                  variant: product.variant_id,
                  qty: qty,
                  pickupPoints: product.pickupPoints,
                });
              } else {
                productQty.qty = qty;
                await productQty.save();
              }
              if (req.body.assign.length - 1 == index1) {
                res.json({ message: "done" });
              }
            });
          }
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const pickupCustomerCount = asyncHandler(async (req, res) => {
  try {
    let orderAssign = await AssignOrder.find({
      approve: true,
      pickupPoints: req.params.id,
      accCompany_id: req.companyId
    }).select("_id");

    let Ids = orderAssign.map(({ _id }) => {
      return _id;
    });

    let assignCustomer = await pickupPoint_Order.distinct("user", {
      $or: [{ pickupAddress: req.params.id }, { _id: Ids }],
    });

    res.json({
      count: assignCustomer.length,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const pickupCustomerRevenue = asyncHandler(async (req, res) => {
  try {
    let orderAssign = await AssignOrder.find({
      approve: true,
      pickupPoints: req.params.id,
      accCompany_id: req.companyId
    }).select("_id");

    let Ids = orderAssign.map(({ _id }) => {
      return _id;
    });

    let assignCustomer = await pickupPoint_Order.find({
      $or: [{ pickupAddress: req.params.id }, { _id: Ids }],
    });

    let revenue = 0;
    assignCustomer.forEach((order) => {
      revenue += order.grandTotal;
    });
    res.json({
      revenue,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  sellerUpdateOrderStatus,
  getAllOrders_Sellers,
  createOrder,
  createOrderSingle,
  createorder,
  deleteOrdersById,
  getAllOrderPickupPoints,
  orderFilter,
  orderPickupPointList,
  orderPickupPointListFilter,
  orderSellerListFilter,
  createOrderMobile,
  orderCount,
  orderCancelledCount,
  getOrderReport,

  orderDeliveredCount,
  orderPendingCount,
  orderRejectedCount,

  orderPickupRejectedCount,
  orderPickupDeliveredCount,
  orderPendingPickupCount,
  orderPickupCancelledCount,
  orderPickupPointsCancelledCount,

  orderPendingPickupPointsCount,
  orderPickupPoiintsRejectedCount,
  orderPickupPointsDeliveredCount,

  orderPaidPaymentCount,
  orderPartiallyPaidPaymentCount,
  orderPendingPaymentCount,

  orderPickupPaidPaymentCount,
  orderPickupPartiallyPaidPaymentCount,
  orderPickupPendingPaymentCount,

  orderPickupPointsPaidPaymentCount,
  orderPickupPointsPartiallyPaidPaymentCount,
  orderPickupPointsPendingPaymentCount,

  orderShippedCount,
  orderPickupShippedCount,
  orderPickuppointsShippedCount,

  orderPickupPointByIdCount,
  orderPickupPointsCount,

  orderAssign,
  orderInHousePickupPointList,
  getAllInHouseOrderPickupPoints,

  pickupCustomerCount,
  pickupCustomerRevenue,

  getOrderAdminById,
  getAllOrdersFilter,
  getAllOrdersByType
};
