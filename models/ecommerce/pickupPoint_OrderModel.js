const mongoose = require("mongoose"); // Erase if already required
const orderPickupSeq = require("./orderMasterModel");
// const Delivery = require("./deliveriesModel");
const ProductStock = require("../../models/ecommerce/pickupPoint_stockModel");
const ProductStockQty = require("./productStockModel");
const ProductCostVariation = require("./productCostVariationModel");
// const GeneralSetting = require("./generalSettingsModel");
const OrderStatusTransaction = require("./orderStatusTransactionModel");

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    products: [
      {
        product: {
          type: String
        },
        count: Number,
        variant: String,
        variant_weight: String,
        sale_rate: Number,
        sku: String,
        pickupPoints: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pickup_point",
        },
        deliveryType: { type: String, default: "Home Delivery" },
        subTotal: Number,
        tax: Number,
        tax_type: String,
        total: Number,
        shippingCost: Number,
        grandTotal: Number,
      },
    ],

    invoiceCount: { type: Number },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: "coupons" },

    contactDetail: { type: String },
    contactType: { type: String },

    order_referenceNo: { type: String, unique: true },

    order_invoiceNo: { type: String },
    order_invoiceDate: { type: Date },

    language: { type: mongoose.Schema.Types.ObjectId, ref: "languages" },
    currency_id: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },

    timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: "timeSlot" },

    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accountCompany",
      index: true
    },

    ipAddress: { type: String },
    count: Number,
    Seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "sellers" }],
    basePrice: Number,
    subTotal: Number,
    tax: Number,
    total: Number,
    shippingCost: Number,
    grandTotal: Number,
    Amount: String,
    order_type: { type: String, enum: ["Regular", "From Pickup Point"] },
    Paid: { type: Number, default: 0 },
    Balance: {
      type: Number,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    Delivery_Status: String,
    Payment_method: String,
    deliveryType: {type: String},
    Payment_Status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentStatusMaster",
      default: () => {
        return "644fba2175eb6d3d4914a60d";
      },
    },
    paymentIntent: {},
    pickupAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pickup_point",
    },
    timeSlot: { type: String },
    timeGroup: { type: String },
    date: { type: Date },
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: "country" },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    pickupPoint_Staff: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
    billingAddress: {
      btype: { type: String },
      bcountry: String,
      bstate: String,
      bcity: String,
      bzip: String,
      baddressLine1: String,
      baddressLine2: String,
      blandmark: String,
      bprovince: String,
      bcompany: String,
    },
    shippingAddress_save: {
      country: { type: String, require: true },
      state: { type: String, require: true },
      city: { type: String, require: true },
      zip: { type: String, require: true },
      addressLine1: { type: String },
      addressLine2: { type: String },
      landmark: { type: String },
      province: { type: String },
      phone: { type: Number },
      email: { type: String },
      order_notes: { type: String },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderAssign: {
      type: Boolean,
      default: false,
    },
    orderStatusTrans: [
      { type: mongoose.Schema.Types.ObjectId, ref: "orderStatus_Transaction" },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

orderSchema.pre("save", async function (next) {
  const order_Mrn = await GeneralSetting.findOneAndUpdate(
    { parent_id: "64882e43c2b806ddd3050c01", accCompany_id: this.accCompany_id },
    { $inc: { referenceNo: 1, invoiceNo: 1 } }
  );

  
  const generalSettings = await GeneralSetting.findOne(
    { parent_id: "648823db48b5950c2889e68e",accCompany_id: this.accCompany_id }
  );

  
  this.order_referenceNo =
    generalSettings?.SalesReferencePrefix + order_Mrn.referenceNo;

  if(order_Mrn.invoiceNo == undefined) {
    order_Mrn.invoiceNo = 0;
    await order_Mrn.save();
  }

  this.order_invoiceDate = new Date();
  this.order_invoiceNo = generalSettings?.SalesReferencePrefix + order_Mrn.invoiceNo + this.order_invoiceDate.getMonth() + this.order_invoiceDate.getDate();


  if (this.products.length > 0) {
    this.products.forEach(async (product) => {
      if (product.deliveryType.toLowerCase() != "home delivery") {
        let productStock = await ProductStock.create({
          product_id: product.product,
          variant_id: product.variant,
          qty: product.count,
          pickupPoint_id: product.pickupPoints,
          seller_id: this.seller_id,
          trans_type: "reserve",
          sku: product.sku,
          staff_id: this.staff_id,
          seller_id: this.seller_id,
          cost: product.subTotal + product.tax,
        });

        if (product.pickupPoints != undefined) {
          let productStockQty = await ProductStock.find({
            product_id: product.product,
            variant_id: product.variant,
            sku: product.sku,
            pickupPoint_id: this.pickupAddress,
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
            product_id: product.product,
            variant: product.variant,
            pickupPoints: product.pickupPoints,
            sku: product.sku,
          });
          if (productQty == null) {
            await ProductStockQty.create({
              product_id: product.product,
              sku: product.sku,
              variant: product.variant,
              qty: qty,
              pickupPoints: product.pickupPoints,
            });
          } else {
            productQty.qty = qty;
            await productQty.save();
          }
        }
      }
    });
  }

  this.Balance = this.grandTotal;
  
  next();
});

/* orderSchema.post('save', async function(next)  {
  await OrderStatusTransaction.create({
    orderId: order._id,
    orderStatusId: "6423edb20944088884f88cca",
  });

  next();
})
 */

orderSchema.index({ "$*": "text" });

//Export the model
module.exports = mongoose.model("pickupPoint_Order", orderSchema);
