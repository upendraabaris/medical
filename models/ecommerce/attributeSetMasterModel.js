const mongoose = require("mongoose");
// const Language = require("./languageModel");

const attributeSetMasterSchema = new mongoose.Schema({
    name: { type: String },
    navigation: {type: String},
    values: [ { type: mongoose.Schema.Types.ObjectId, ref: "attribute" } ],
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "languages", index: true },
    uid: { type: String, index: true },
    accCompany_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accCompany",index: true
    },
  
});

attributeSetMasterSchema.pre("save", async function (next) {
  let language = await Language.findOne({ accCompany_id: this.accCompany_id, _id: this.language_id });
  if(language == null) {
    throw new Error("Either language is wrong or company id is wrong!");
  }
  next();
});


module.exports = mongoose.model("attributeSetMaster", attributeSetMasterSchema);