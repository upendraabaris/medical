const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    category_id: { type: String },
    title: String,
    slug: String,
    short_description: String,
    description: String,
    banner: {
      public_id: String,
      url: String
    },
    meta_title: String,
    meta_img: {
      public_id: String,
      url: String
    },
    meta_description: String,
    meta_keywords: String,
    status: Number,
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true }, 
    uid: { type: String, index: true },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ title: "text" });

module.exports = mongoose.model("blogs", blogSchema);
