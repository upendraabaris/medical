const mongoose  = require("mongoose");

const sequence = new mongoose.Schema({
    sequence: { type: Number },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true }
});

module.exports = mongoose.model("pickupPointSequence", sequence);