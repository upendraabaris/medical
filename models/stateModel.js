const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
  // state_id: { type: Number, required: true, unique: true, index: true },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  state_name: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('State', stateSchema);
