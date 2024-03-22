const mongoose = require("mongoose");

const attributeSequenceSchema = new mongoose.Schema({
    sequence: { type: Number },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
}); 

module.exports = mongoose.model("attributeSetSequence", attributeSequenceSchema);