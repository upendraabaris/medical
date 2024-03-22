const mongoose = require("mongoose");
//const Language = require("../");

const attributeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  value: String,

  language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },

  uid: { type: String, require: true },

  accCompany_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountCompany",
  },
});

/* attributeSchema.pre("save", async function (next) {
  let language = await Language.findOne({ accCompany_id: this.accCompany_id, _id: this.language_id });
  if(language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
  next();
});
 */


module.exports = mongoose.model("attribute", attributeSchema);
