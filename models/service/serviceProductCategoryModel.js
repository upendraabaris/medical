const mongoose = require('mongoose');

const serviceProductCategorySchema = new mongoose.Schema({
    service_productcategory_id: { type: Number, unique: true },
    service_productcategory: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('ServiceProductCategory', serviceProductCategorySchema);
