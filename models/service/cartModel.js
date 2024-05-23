const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    qty: {
        type: Number,
        default: 1, // You can set a default quantity if needed
        min: 1,
    },
});

const CreateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [ProductSchema], // Ensure that 'products' is defined as an array of ProductSchema
});

module.exports = mongoose.model("cart", CreateSchema);