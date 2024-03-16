const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var BannerSchema = new mongoose.Schema(
  {
    SliderTopHeading: { type: String },
    bottomText: { type: String },
    url: { type: String },
    image: {
      public_id: String,
      url: String,
    },
    approval: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("SellerBanner", BannerSchema);
