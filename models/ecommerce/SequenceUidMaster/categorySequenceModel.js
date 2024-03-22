const mongoose = require("mongoose");

const categorySequenceSchema = new mongoose.Schema({
    sequence: { type: Number },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany" }
}); 

module.exports = mongoose.model("categorySequence", categorySequenceSchema);