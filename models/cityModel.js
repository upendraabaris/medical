const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  // city_id: { type: Number, required: true, unique: true },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  city_name: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('City', citySchema)