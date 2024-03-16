const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    userTagged: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tagBy: {  type: mongoose.Schema.Types.ObjectId, ref: "Tags" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Tag", tagSchema);