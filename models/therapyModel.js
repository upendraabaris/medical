const mongoose = require("mongoose")

const therapySchema = new mongoose.Schema({
    category: { type: String },
    therapy_name: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model("TherapyMaster",therapySchema)