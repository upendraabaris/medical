const mongoose = require("mongoose");

const productSequenceSchema = new mongoose.Schema({
    sequence: { type: Number },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
}); 

module.exports = mongoose.model("productSequence", productSequenceSchema);