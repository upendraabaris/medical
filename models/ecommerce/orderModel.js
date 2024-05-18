const mongoose = require("mongoose"); // Erase if already required
//const mongooseSequence = require("mongoose-sequence")(mongoose);

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    childOrderId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "pickupPoint_Order" },
    ],
    currency: { type: mongoose.Schema.Types.ObjectId, ref: "currencies" },
    language: { type: mongoose.Schema.Types.ObjectId, ref: "languages" },
    ipAddress: { type: String },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product_test",
        },
        count: Number,
        variant: String,
        variant_weight: String,
        sale_rate: Number,
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
    /* product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product_test" },
    variant_id: String,
     */
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: "coupons" },
    count: Number,
    Seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accCompany",index: true
    },

    basePrice: Number,
    subTotal: Number,
    tax: Number,
    total: Number,
    shippingCost: Number,
    discount: Number,
    grandTotal: Number,
    Amount: String,
    Delivery_Status: String,
    Payment_method: String,
    Payment_Status: String,
    paymentIntent: {},
    pickupAddress: {
      avatar: String,
      address: String,
      location: { long: String, lat: String },
      province: String,
      phone: String,
      email: String,
      pickupPoint_name: String,
      pickUpPointStatus: Boolean,
      pickUpManagerSchema: String,
    },
    billingAddress: {
      btype: { type: String, default: "billing" },
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
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
        "Rejected",
        "Pickup",
        "Packing",
        "Ready to Ship",
        "Out For Delivery",
        "Send to warehouse",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Payment_Status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentStatusMaster",
      default: () => {
        return "644fba2175eb6d3d4914a60d";
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ "$*": "text" });

//orderSchema.plugin(mongooseSequence, { inc_field: "id" });

//Export the model
module.exports = mongoose.model("Order1", orderSchema);
