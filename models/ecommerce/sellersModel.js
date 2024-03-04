const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePhoto: {
      public_id: String,
      url: String,
    },

    dob: { type: String },
    
    adhaar_card: { type: String },
    pan_card: { type: String },

    role: { type: String, default: "Seller", enum: ["Seller"] },
    approve: { type: Boolean, default: true },

    accGroup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accGroupUnderMaster",
    },

    instaId: { type: String },
    fbId: { type: String },
    category: [{ type: String }],
    industry: [{ type: String }],
    brand: [{ type: String }],
    twitterId: { type: String },
    youtubeId: { type: String },
    city: { type: String },

    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany" },


    language_id: { type: mongoose.Schema.Types.ObjectId, ref: 'languages' },
    currency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'currency' },
    openBalAmt: { type: Number },

    openBalDate: { type: Date },
    openBalType: { type: String, enum: ["Cr", "Dr"] },

    long: { type: String },
    lat: { type: String },
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    country: String,
    landmark: String,
    province: String,
    seller_package_id: String,
    remaining_uploads: Number,
    remaining_digital_uploads: Number,
    invalid_at: String,
    remaining_auction_uploads: Number,
    rating: Number,
    num_of_reviews: Number,
    num_of_sale: Number,
    verification_status: Number,
    verification_info: String,
    cash_on_delivery_status: Number,
    admin_to_pay: Number,
    bank_name: String,
    bank_acc_name: String,
    bank_acc_no: String,
    bank_routing_no: String,
    bank_payment_status: Number,
    tax_number: String,
    sellerType: {type: mongoose.Schema.Types.ObjectId, ref: "sellerMaster"},
    informations: [
      {
        type: { type: String },
        label: { type: String },
        name: { type: String },
        value: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

sellerSchema.index({ "$**": "text" });

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
sellerSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
sellerSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

module.exports = mongoose.model("sellers", sellerSchema);
