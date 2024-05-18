const mongoose = require("mongoose")

const sosTransactionSchema = new mongoose.Schema({
    // sos_transaction_id: { type: Number, required: true, unique: true },
    sos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SOS' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // datetime: { type: Date },
    geocoordinates: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'], // 'geocoordinates.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // 'geocoordinates.coordinates' must be an array of numbers
      required: true
    }
  },
  area: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('SOSTransaction', sosTransactionSchema);
