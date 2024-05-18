const mongoose = require("mongoose")

const postTypeSchema = new mongoose.Schema({
    post_type: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('PostType', postTypeSchema)