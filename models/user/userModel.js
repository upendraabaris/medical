const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  user_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserType", index: true},
  parent_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index:true},
  referring_user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserType", index:true }],
  reporting_user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserType", index:true }],
  is_emergency_contact: { type: Boolean },
  pleadge_blood_donation: { type: Boolean, default: false },
  pleadge_organ_donation: { type: Boolean, default: false},
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  national_digital_id: { type: String },
  abha_no: { type: String },
  kcc_passport_no: { type: String },
  // profile_pic: {  public_id: {type: String} ,url: {type: String} },
  profile_pic: {  type: String },
  first_name: { type: String },
  second_name: { type: String },
  last_name: { type: String },
  dob: { type: Date },
  gender: { type: String },
  blood_group: { type: String, maxlength: 3 },
  nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', index:true},
  country_of_residence: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', index:true},
  mobile: { type: String },
  email: { type: String },
  otp: { type : Number },
  entry_date: { type: Date },
  status: { type: String },
  expiry_date: { type: Date },
  password: { type: String },
  isFavorite: [ { type: mongoose.Schema.Types.ObjectId }],
  relation_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRelation', index:true},
  isDeath: { type: Boolean, default:false},
  causeOfDeath: { type: String },
  // isLoginPermit: { type: Boolean, default: false, required: true },
  // addBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}
  // sos_user_id: { type: mongoose.Schema.Types.ObjectId }
  // emailVerified: {type: Boolean, default: false, index: true},
  // mobileVerified: {type: Boolean, default: false, index: true},
  // New field for deletion status
  deletionStatus: { type: String, enum: ['active', 'archived'], default: 'active' },
  is_active: { type: Boolean, default: true },
  archivedAt: { type: Date }
},
{
  timestamps: true,
})

userSchema.pre("save", async function(next){
  try{
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10)
    }
    next()
  }catch(error){
    next(error)
  }
})

module.exports = mongoose.model('User', userSchema)
