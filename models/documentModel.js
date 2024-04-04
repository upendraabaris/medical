const mongoose  = require("mongoose");

const userDocumentSchema = new mongoose.Schema({
    insurance_policy: { type: String, required: true},
    // adhaar_front_card: { type: String, require: [true, "Adhaar card Front doc is a must"] },
    // adhaar_back_card: { type: String, require: [true, "Adhaar card Back doc is a must"] },
    // pan_card: { type: String, require: [true, "Pan card doc is a must"] },
    // gst: { type: String },
    // bank_proof: { type: String, require: [true, "Bank Proof is a must"] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("userDocument", userDocumentSchema)