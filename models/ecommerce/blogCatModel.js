const mongoose = require("mongoose");

const blogsCateSchema = new mongoose.Schema({
  name: { type: String, require: true },
  slug: { type: String },
  accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true },
  language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },
  uid: { type: String, index: true }
});

module.exports = mongoose.model("blogsCat", blogsCateSchema);
