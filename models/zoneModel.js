const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
})

module.exports = mongoose.model('Zone', zoneSchema)
