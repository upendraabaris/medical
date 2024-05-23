const mongoose = require("mongoose")

const nbsuResponseSchema = new mongoose.Schema({
    category: { 
        type: String
    },
    response:{
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Response",nbsuResponseSchema)