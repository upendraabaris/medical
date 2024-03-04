const mongoose = require("mongoose"); // Erase if already required
// const Language = require("./languageModel");

// Declare the Schema of the Mongo model
var BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
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
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },
    uid: { type: String, index: true },
    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accCompany",index: true
    },

  },
  {
    timestamps: true,
  }
);

BannerSchema.pre("save", async function (next) {
  let language = await Language.findOne({ accCompany_id: this.accCompany_id, _id: this.language_id });
  if(language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
  next();
});


//Export the model
module.exports = mongoose.model("Banner", BannerSchema);
