const mongoose = require("mongoose")

const blockMasterSchema = new mongoose.Schema({
    city_id: { type: mongoose.Schema.Types.ObjectId, ref:'City'},
    postal_code_id: { type: mongoose.Schema.Types.ObjectId, ref:'postalCode'},
    block_name: { type: String }
})

module.exports = mongoose.model('Block', blockMasterSchema)