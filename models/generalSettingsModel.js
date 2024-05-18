const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema(
  {
    system_name: String,
    system_logo_white: String,
    system_log_black: String,
    system_timezone: String,
    admin_page_login_background: String,
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "general_setting" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accCompany_id: { type: mongoose.Schema.Types.ObjectId, ref: "accCompany", index: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("general_setting", mongooseSchema);
