const mongoose = require("mongoose")

const engagementTypeSchema = new mongoose.Schema({
    engagement_type: { type: String, required: true },
    payout_type: { type: String, required: true },
    payout_applicability: { type: String, required: true },
    payout_percentage: { type: Number, required: true }
})

module.exports = mongoose.model("EngagementType", engagementTypeSchema)


//isko delete krna hai baad mai