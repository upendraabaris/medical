const mongoose = require("mongoose"); // Erase if already required
// const Language = require("./languageModel");

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
      ref: "accCompany",index: true
    },
    uid: { type: String, index: true },
    name: {
      type: String,
      required: true,
    },
    order_level: {
      type: Number,
      required: true,
    },
    description: { type: String },
    commision_rate: {
      type: String,
    },
    banner: {
      public_id: String,
      url: String,
    },
    icon: {
      public_id: String,
      url: String,
    },
    featured: {
      type: Boolean,
      default: true,
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
module.exports = mongoose.model("prodIndustry", prodcategorySchema);
