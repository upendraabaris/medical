const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  address_id: { type: Number, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hos_clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HospitalClinic', required: true },
  address_type: { type: String, enum: ['HOME', 'OFFICE'], required: true },
  address1: { type: String },
  address2: { type: String },
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CityMaster' },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StateMaster' },
  postalcode: { type: String, maxlength: 6 },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CountryMaster' },
  geocode: { type: String },  // Assuming you store the coordinates as a string
  isdcode: { type: String },
  stdcode: { type: String },
  landlineno: { type: String },
  websiteaddress: { type: String },
  emailaddress: { type: String },
  status: { type: Boolean, default: false },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Address', addressSchema);
