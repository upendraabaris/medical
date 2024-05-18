const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref:'State', index: true}
  // cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
})

module.exports = mongoose.model('Zone', zoneSchema)
