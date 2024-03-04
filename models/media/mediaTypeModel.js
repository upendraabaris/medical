const mongoose = require("mongoose")

const mediaTypeSchema = new mongoose.Schema({
    media_type_id: { type: Number, required: true, unique: true },
    media_type: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('MediaType', mediaTypeSchema)