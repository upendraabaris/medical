const mongoose = require("mongoose");

const packageSequenceSchema = new mongoose.Schema({
    sequence: { type: Number },
});

module.exports = mongoose.model("packageSequence", packageSequenceSchema);