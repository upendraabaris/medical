const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ShippingAddress = require("../models/shippingAddressModel");
const Product = require("../models/productModel");
const orderStatusTransaction = require("../models/orderStatusTransactionModel");
const pickupPoint_Order = require("../models/pickupPoint_OrderModel");
const OrderMaster = require("../models/orderMasterModel");
const ClubPointsUsers = require("../models/clubPointsUserModel");
const EMI = require("../models/emiModel");
const PickupPointsStock = require("../models/pickupPoint_stockModel");
const mongoose = require("mongoose");
const ProductStock = require("../models/pickupPoint_stockModel");
const ProductStockQty = require("../models/productStockModel");
const OrderAssign = require("../models/assignOrderModel");
const Delivery = require("../models/deliveriesModel");
const Wholesale = require("../models/wholesaleModel");

const AssignOrder = require("../models/assignOrderModel");
const AffiliateBasic = require("../models/affiliateBasicModel");
const AffiliateLogs = require("../models/affiliateLogslModel");
const AffiliateUser = require("../models/affiliateUserModel");
let code = "ETG-000001001";

const GeneralSetting = require("../models/generalSettingsModel");

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
    let alluserorders = await pickupPoint_Order
      .find({
        Seller: { $in: req.params.id },
      })
      .populate("products.product")
      .populate("products.pickupPoints")
      .populate("pickupAddress")
      .populate("Seller", "firstname lastname")
      .populate("language currency")
      .populate("user", "firstname lastname")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .lean()
      .sort({ createdAt: -1 });

    alluserorders.forEach((userorder) => {
      userorder.createdAt = userorder.createdAt.toDateString();
    });

    alluserorders = alluserorders.filter((userorder) => {
      if (userorder.Seller.length > 0) {
        return userorder;
      }
    });

    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const userorders = await pickupPoint_Order
      .find()
      .populate("products.product")
      .populate("products.pickupPoints")
      .populate("pickupAddress")
      .populate("Seller", "firstname lastname")
      .populate("language currency")
      .populate({ path: "user", populate: { path: "currency language" } })
      .populate("Payment_Status")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .lean()
      .sort({ createdAt: -1 });

    let alluserorders = {};
    alluserorders = userorders;
    alluserorders.forEach(async (userorder) => {
      d = userorder.createdAt;
      userorder.createdAt =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");

      const getOrderTrans = await orderStatusTransaction
        .find({ orderId: userorder._id })
        .populate("orderStatusId")
        .sort({ createdAt: -1 });
      userorder.orderStatusTrans.push(getOrderTrans._id);
    });
    res.json({ alluserorders });
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
    let userorders = await pickupPoint_Order
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
  } catch (error) {
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
    let getaOrderById = await pickupPoint_Order
      .findById(id)
      .populate("products.product")
      .populate({
        path: "user",
        select: "firstname lastname billingAddress currency language",
      })
      .populate("language currency")
      .populate("user.billingAddress")
      .populate({
        path: "pickupAddress",
        populate: { path: "pickUpManagerSchema" },
      })
      .populate("parent_id")
      .populate({
        path: "orderStatusTrans",
        populate: { path: "orderStatusId" },
      })
      .populate("Payment_Status")
      .populate("Seller")
      .populate("coupon_id")
      .lean();

    if (getaOrderById == null) {
      throw new Error("Order not found");
    }

    let assignOrder = await AssignOrder.find({ orderId: req.params.id });
    let deliverys = await Delivery.find({ order_id: req.params.id });
    const getOrderTrans = await orderStatusTransaction
      .find({ orderId: id })
      .populate("orderStatusId")
      .populate({
        path: "staffid",
        select: ["firstname", "lastname", "mobile"],
      })
      .populate({ path: "userid", select: ["firstname", "lastname", "mobile"] })
      .sort({ createdAt: -1 });

    let products = [];
    let invoice12 = [];
    let invoice_2 = [];
    let product;
    createdAt = getaOrderById.createdAt.toDateString();
    d = getaOrderById.createdAt;
    getaOrderById.createdAt =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");

    if (getaOrderById.products != undefined) {
      let index = -1;
      getaOrderById.products.forEach(async (product1) => {
        product1.product.variations.forEach(async (variant) => {
          if (String(variant._id) == String(product1.variant)) {
            let wholesale = await Wholesale.aggregate([
              {
                $match: {
                  productId: product1.product._id,
                },
              },
              {
                $unwind: "$products",
              },
              {
                $match: {
                  "products.product_id": product1.product._id,
                  "products.variant_id": product1.variant,
                  "products.sku": product1.sku,
                },
              },
              {
                $unwind: "$products.wholesale",
              },
              {
                $match: {
                  "products.wholesale.min_qty": { $lte: product1.count },
                  "products.wholesale.max_qty": { $gte: product1.count },
                },
              },
            ]);
            if (
              wholesale != undefined &&
              wholesale != null &&
              wholesale.length > 0
            ) {
              variant.sale_rate = wholesale[0].products.wholesale.sale_price;
            }
            index += 1;

            let prod = {
              product_name: product1.product.name,
              product_variant: variant,
              product_image: product1.product.mainimage_url,
              product_count: product1.count,
              product_subTotal: product1.subTotal,
              product_tax: product1.tax,
              product_total: product1.total,
            };
            products.push(prod);
            if (getaOrderById.products.length - 1 == index) {
              res.json({
                products,
                getaOrderById,
                getOrderTrans,
                createdAt,
                assignOrder,
                deliverys,
              });
            }
          }
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    /*     const user = await User.findById(req.body.userid)
      .populate({
        path: "cart.products.product",
        populate: { path: "variations.variation_price" },
      })
      .populate("cart.products.pickupPoints")
      .populate("cart.coupon_id");

 */
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

                subComboHome += product.price * combo.minComboQty;
              }
            });
          });
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
          country: req.body.billAddress.bcountry,
          state: req.body.billAddress.bstate,
          city: req.body.billAddress.bcity,
          zip: req.body.billAddress.bzip,
          addressLine1: req.body.billAddress.baddressLine1,
          addressLine2: req.body.billAddress.baddressLine2,
          landmark: req.body.billAddress.blandmark,
          province: req.body.billAddress.bprovince,
          phone: req.body.billAddress.bphone,
          email: req.body.billAddress.bemail,
        };
      }
      let billingAddress = {
        bcountry: req.body.billAddress.bcountry,
        bstate: req.body.billAddress.bstate,
        bcity: req.body.billAddress.bcity,
        bzip: req.body.billAddress.bzip,
        baddressLine1: req.body.billAddress.baddressLine1,
        baddressLine2: req.body.billAddress.baddressLine2,
        blandmark: req.body.billAddress.blandmark,
        bprovince: req.body.billAddress.bprovince,
        bphone: req.body.billAddress.bphone,
        bemail: req.body.billAddress.bemail,
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
            product.sale_sp = sale_rate.sale_rp;
            console.log("great", product.sale_sp, sale_rate.sale_sp);
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
              home.subTotal = Number(
                Number(Number(home.subTotal) - Number(tax)).toFixed(2)
              );
            } else {
              let tax = Number(
                Number(
                  (home.taxPer * home.count * home.sale_rate) / 100
                ).toFixed(2)
              );
              home.subTotal += tax;
            }
          }

          homeshippingCost += home.shippingCost;

          if (!home.comboHome) {
            hometotal += Number(home.tax) + Number(home.subTotal);
          }
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
      if (req.body.shipping_Address != undefined) {
        orders.shippingAddress_save = req.body.shipping_Address;
        homeOrder.shippingAddress_save = req.body.shipping_Address;
      } else {
        homeOrder.shippingAddress_save = {
          country: req.body.billAddress.bcountry,
          state: req.body.billAddress.bstate,
          city: req.body.billAddress.bcity,
          zip: req.body.billAddress.bzip,
          addressLine1: req.body.billAddress.baddressLine1,
          addressLine2: req.body.billAddress.baddressLine2,
          landmark: req.body.billAddress.blandmark,
          province: req.body.billAddress.bprovince,
          phone: req.body.billAddress.bphone,
          email: req.body.billAddress.bemail,
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
        homeOrder.language = user.language;
        homeOrder.currency = user.currency;
        //        console.log(homeOrder);
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
                subComboHome += product.price * combo.minComboQty;
              }
            });
          });
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
      req.body.shipping_address = await ShippingAddress.findById(
        req.body.shippingAddress_id
      );
      req.body.billingAddress_id = await ShippingAddress.findById(
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
          country: req.body.billAddress.bcountry,
          state: req.body.billAddress.bstate,
          city: req.body.billAddress.bcity,
          zip: req.body.billAddress.bzip,
          addressLine1: req.body.billAddress.baddressLine1,
          addressLine2: req.body.billAddress.baddressLine2,
          landmark: req.body.billAddress.blandmark,
          province: req.body.billAddress.bprovince,
          phone: req.body.billAddress.bphone,
          email: req.body.billAddress.bemail,
        };
      }
      let billingAddress = {
        bcountry: req.body.billAddress.bcountry,
        bstate: req.body.billAddress.bstate,
        bcity: req.body.billAddress.bcity,
        bzip: req.body.billAddress.bzip,
        baddressLine1: req.body.billAddress.baddressLine1,
        baddressLine2: req.body.billAddress.baddressLine2,
        blandmark: req.body.billAddress.blandmark,
        bprovince: req.body.billAddress.bprovince,
        bphone: req.body.billAddress.bphone,
        bemail: req.body.billAddress.bemail,
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
              home.subTotal = Number(
                Number(Number(home.subTotal) - Number(tax)).toFixed(2)
              );
            } else {
              let tax = Number(
                Number(
                  (home.taxPer * home.count * home.sale_rate) / 100
                ).toFixed(2)
              );
              home.subTotal += tax;
            }
          }

          if (!home.comboHome) {
            hometotal += Number(home.tax) + Number(home.subTotal);
            homeshippingCost += home.shippingCost;
          }
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
      if (req.body.shipping_Address != undefined) {
        orders.shippingAddress_save = req.body.shipping_Address;
        homeOrder.shippingAddress_save = req.body.shipping_Address;
      } else {
        homeOrder.shippingAddress_save = {
          country: req.body.billAddress.bcountry,
          state: req.body.billAddress.bstate,
          city: req.body.billAddress.bcity,
          zip: req.body.billAddress.bzip,
          addressLine1: req.body.billAddress.baddressLine1,
          addressLine2: req.body.billAddress.baddressLine2,
          landmark: req.body.billAddress.blandmark,
          province: req.body.billAddress.bprovince,
          phone: req.body.billAddress.bphone,
          email: req.body.billAddress.bemail,
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
        homeOrder.language = user.language;
        homeOrder.currency = user.currency;
        console.log(homeOrder);
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
    const count = await pickupPoint_Order.find().count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointsCount = asyncHandler(async (req, res) => {
  try {
    const count = await pickupPoint_Order
      .find({ pickupAddress: { $ne: null } })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const orderPickupPointByIdCount = asyncHandler(async (req, res) => {
  try {
    let count = await pickupPoint_Order
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: { $ne: null } })
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
      .find()
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
      .find()
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

const orderRejectedCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find()
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

const orderDeliveredCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find()
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

const orderPendingPickupCount = asyncHandler(async (req, res) => {
  try {
    let orderList = await pickupPoint_Order
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: req.params.id })
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
      .find({ pickupAddress: { $ne: null } })
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
      .find()
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
      .find({ pickupAddress: { $ne: null } })
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
      .find({ pickupAddress: { $ne: null } })
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
      .find({ pickupAddress: { $ne: null } })
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
};
