const mongoose = require('mongoose')

const userTypeSchema = new mongoose.Schema({
  id: { type: String },
  user_type: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('UserType', userTypeSchema)
