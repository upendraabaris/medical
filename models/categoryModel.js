const mongoose = require('mongoose')

// Define category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, enum: ['adult', 'children'] }
})

// Create Category model
module.exports = mongoose.model('Category', categorySchema)
