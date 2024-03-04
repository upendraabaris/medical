const mongoose = require("mongoose")

const sosSchema = new mongoose.Schema({
    sos_id: { type: Number },
    sos_condition: { type: String },
    sos_description: { type: String },
    sos_icon: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('SOS', sosSchema)