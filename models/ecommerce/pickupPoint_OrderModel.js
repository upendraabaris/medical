
const mongoose = require("mongoose"); // Erase if already required
const GeneralSetting = require("../generalSettingsModel")


const userHealthProfileSchema = new mongoose.Schema({
  question_answer: [{ question: { type: String }, answers: [{ type: String }], questionType: { type: String } }],
  category: { type: String, required: true },
  updated_date: { type: Date, default: Date.now }
},
  {
    timestamps: true
  });

const patientVitalInfoSchema = new mongoose.Schema({
  height: {
    feet: { type: Number/* , required: true */ },
    inches: { type: Number/* , required: true */ }
  },
  weight: { type: Number/* , required: true */ },
  pulseRate: { type: Number, min: 60, max: 100/* , required: true */ },
  respiratoryRate: { type: Number, min: 12, max: 16/* , required: true */ },
  bodyTemperature: { type: Number, min: 90, max: 105/* , required: true */ },
  bloodPressure: {
    systolic: { type: Number/* , required: true */ },
    diastolic: { type: Number/* , required: true */ }
  },
  oxygenSaturation: { type: Number, min: 70, max: 100/* , required: true */ },
  dateTime: { type: Date, default: Date.now }
},
  {
    timestamps: true,
  });


// Declare the Schema of the Mongo model
var ServiceHistorySchema = new mongoose.Schema(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    addedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedByStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    cheif_complaint: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChiefComplaint' }],
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

    timeSlot: { type: Date, ref: "timeSlot" },

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
    Paid: { type: Number, default: 0 },
    Balance: {
      type: Number,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    Delivery_Status: String,
    Payment_method: String,
    deliveryType: { type: String },
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
    user_id: {
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
    order_type: { type: String, index: true, enum: ['Medical Consultancy', 'Speciality Consultant'] },
    questions: userHealthProfileSchema,
    vitals: patientVitalInfoSchema,
  },
  {
    timestamps: true,
    strict: false,
  }
);

ServiceHistorySchema.pre("save", async function (next) {
    const order_Mrn = await GeneralSetting.findOneAndUpdate(
      { _id: "64882e43c2b806ddd3050c01"},
      { $inc: { referenceNo: 1, invoiceNo: 1 } }
    );


    const generalSettings = await GeneralSetting.findOne(
      { _id: "648823db48b5950c2889e68e" }
    );


    this.order_referenceNo =
      generalSettings?.SalesReferencePrefix + order_Mrn.referenceNo;

    if(order_Mrn.invoiceNo == undefined) {
      order_Mrn.invoiceNo = 0;
      await order_Mrn.save();
    }

    this.order_invoiceDate = new Date();
    this.order_invoiceNo = generalSettings?.SalesReferencePrefix + order_Mrn.invoiceNo + this.order_invoiceDate.getMonth() + this.order_invoiceDate.getDate();


  this.Balance = this.grandTotal;

  next();
});

ServiceHistorySchema.index({ "$*": "text" });

//Export the model
module.exports = mongoose.model("invoice_orders", ServiceHistorySchema);
