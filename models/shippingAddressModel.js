const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    country: { type: mongoose.Schema.Types.ObjectId, ref:'Country', require: true, default: "" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', require: true, default: "" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', require: true, default: "" },
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
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", index: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers", index: true },
    type: { type: String, enum: ["billing", "shipping"], index: true },
    // accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shipping_address", shippingSchema);
