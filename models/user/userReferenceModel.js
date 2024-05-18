const mongoose = require('mongoose')

const userReferenceSchema = new mongoose.Schema({
  // userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', // Referring USER ID from USER MASTER 
  // required: true,},
  // user_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType'},
  referring_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  mobile: { type: Number, required: true },
  // name: { type: String, required: true },
  datetime: {type: Date,default: Date.now },
  clientID: { type: mongoose.Schema.Types.ObjectId, ref:'sellers'},
  is_active: { type: Boolean, default: false } 
  // relation_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRelation'},
   // Referring to USER RELATION MASTER when isfamily = YES
  // qrcodeid: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
  // geocordinates: { type: String },
  // comments: { type: String },
  // isemergencycontact: { type: Boolean, default: false },
  // isfavorite: { type: Boolean, default: false },
  // isfamily: { type: Boolean, default: false },
},{
  timestamps: true
});

module.exports = mongoose.model('UserReference', userReferenceSchema)
