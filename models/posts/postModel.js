const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: { type: String },
    subject: {  type: String },
    images: [{ public_id: { type: String }, url: { type: String } }],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);