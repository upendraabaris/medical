const mongoose = require('mongoose')

const userReferenceSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', // Referring USER ID from USER MASTER 
  required: true,},
  usertypeid: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType', required: true},
  mobile: { type: Number, required: true },
  name: { type: String, required: true },
  qrcodeid: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
  datetime: {type: Date,default: Date.now },
  geocordinates: { type: String },
  comments: { type: String },
  isemergencycontact: { type: Boolean, default: false },
  isfavorite: { type: Boolean, default: false },
  isfamily: { type: Boolean, default: false },
  relationtypeid: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRelation', // Referring to USER RELATION MASTER when isfamily = YES
},
});

module.exports = mongoose.model('UserReference', userReferenceSchema)
