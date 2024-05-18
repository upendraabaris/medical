const mongoose = require("mongoose"); // Erase if already required
const Language = require("../../models/languageModel");

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    level: {
      type: String,
      required: true,
    },
    language_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "languages",
    },
    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accountCompany",
    },
    uid: { type: String },
    name: {
      type: String,
      required: false,
    },
    order_level: {
      type: Number,
      required: false,
    },
    description: { type: String },
    commision_rate: {
      type: String,
    },
    banner: {
      type: String
      // public_id: String,
      // url: String,
    },
    icon: {
      type: String
      // public_id: String,
      // url: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "Physical",
    },
    slug: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    video_link: {
      type: String
    },
    meta_keywords: { type: String },
    approve: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

prodcategorySchema.index({ name: "text" });

prodcategorySchema.pre("save", async function (next) {
  let language = await Language.findOne({
    accCompany_id: this.accCompany_id,
    _id: this.language_id,
  });
  if (language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
});

//Export the model
module.exports = mongoose.model("categories", prodcategorySchema);
