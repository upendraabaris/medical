const mongoose = require('mongoose')

const favoriteContactSchema = new mongoose.Schema({
//   sno: { type: Number, required: true, unique: true, index: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: mongoose.Schema.Types.ObjectId }
  // name: { type: String, required: true },
  // phonenumber: { type: Number, required: true },
  // isDoctor: { type: Boolean, default: false },
  // isHospital: { type: Boolean, default: false },
  // isPharmacy: { type: Boolean, default: false },
  // isPathology: { type: Boolean, default: false },
})

module.exports = mongoose.model('FavoriteContact', favoriteContactSchema)
