const mongoose = require('mongoose')

const designationSchema = new mongoose.Schema({
    name: { type: String, required: true },
},
{
    timestamps: true,
})

module.exports = mongoose.model('designation', designationSchema)
