const mongoose = require('mongoose');

const sellerPhotoGallerySchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: true, index: true },
    name: { type: String },                     // photo name
    image_url: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SellerPhotoGallery', sellerPhotoGallerySchema);
