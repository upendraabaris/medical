const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
    category_name: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
