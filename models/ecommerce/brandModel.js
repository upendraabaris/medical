const mongoose = require("mongoose"); // Erase if already required
const Language = require("../../models/languageModel");

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    top: {
      type: String,
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
    active: {
      type: Boolean,
      default: true,
    },
    uid: { type: String, index: true },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },
    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accCompany",index: true
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.pre("save", async function (next) {
  let language = await Language.findOne({ accCompany_id: this.accCompany_id, _id: this.language_id });
  if(language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
  next();
});


brandSchema.index({ name: "text" });

//Export the model
module.exports = mongoose.model("brands", brandSchema);
