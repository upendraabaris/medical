const mongoose = require("mongoose")

const sellerUserMappingSchema = new mongoose.Schema({
    seller_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sellers'}],
    seller_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerUser'}
})

module.exports = mongoose.model('SellerUserMapping', sellerUserMappingSchema)