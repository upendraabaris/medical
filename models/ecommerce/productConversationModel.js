const mongoose = require("mongoose");

const productConversationSchema = new mongoose.Schema({
  date: Date,
  title: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model(
  "productConversation",
  productConversationSchema
);
