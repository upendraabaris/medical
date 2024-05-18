const mongoose = require('mongoose')

const favoriteContactSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: true, index:true }, 
  seller_user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'SellerUser'}
  // Service Provider (Seller either Doctor/Hospital/Lab/Yoga Teacher/Travel Agent/Hotel)
  // location: { type: mongoose.Schema.Types.ObjectId, required: true }, // Location
  // dateTime: { type: Date, default: Date.now } // DateTime
//   sno: { type: Number, required: true, unique: true, index: true },
  // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // type: { type: mongoose.Schema.Types.ObjectId }
  // name: { type: String, required: true },
  // phonenumber: { type: Number, required: true },
  // isDoctor: { type: Boolean, default: false },
  // isHospital: { type: Boolean, default: false },
  // isPharmacy: { type: Boolean, default: false },
  // isPathology: { type: Boolean, default: false },
})

module.exports = mongoose.model('UserFavoriteContact', favoriteContactSchema)
