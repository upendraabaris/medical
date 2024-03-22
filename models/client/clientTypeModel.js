const mongoose = require("mongoose")

const clientTypeSchema = new mongoose.Schema({
    client_type: { type: String, required: true }
},
{
    timestamps: true,
})

module.exports = mongoose.model('clientType', clientTypeSchema)