const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model("like", likeSchema);