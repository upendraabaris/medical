const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    country: { type: String, require: true, default: "" },
    state: { type: String, require: true, default: "" },
    city: { type: String, require: true, default: "" },
    zip: { type: String, require: true, default: "" },
    addressLine1: { type: String, defualt: "" },
    addressLine2: { type: String, defualt: "" },
    landmark: { type: String, default: "" },
    province: { type: String, default: "" },
    phone: {
      type: String,
      default: () => {
        return "";
      },
    },
    email: { type: String, default: "" },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    company: { type: String, default: "" },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    type: { type: String, enum: ["billing", "shipping"] },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shipping_address", shippingSchema);
