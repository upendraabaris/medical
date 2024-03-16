const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
    Post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    shareBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Share", shareSchema);