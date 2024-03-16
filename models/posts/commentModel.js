const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: { type: String },
    isEdit: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false } 
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);