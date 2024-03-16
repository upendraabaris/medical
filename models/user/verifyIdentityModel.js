const mongoose = require("mongoose");

const verifyIdentitySchema = new mongoose.Schema({
    emailId: { type: String }, 
    mobileNo: { type: String },
    otp: { type: String },
    deviceId: { type: String },
    emailVerified: { type: String },
    mobileVerified: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("verifyIdentity", verifyIdentitySchema)