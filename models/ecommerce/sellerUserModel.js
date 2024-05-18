const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const SellerUserSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  first_name: { type: String, required: true },
  last_name: { type: String },
  mobile: { type: String, required: true, unique: true },
  email: { type: String },
  role: { type: String, enum: ['Admin', 'User'], required: true },
  user_pin: { type: Number },
  firstTimeLogin: { type: Boolean, default: false },
  password: { type: String, required: true },
  profile_pic: { type: String }
},{
  timestamps: true
});

SellerUserSchema.pre("save", async function(next){
    try{
      if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
      }
      next()
    }catch(error){
      next(error)
    }
  });

module.exports = mongoose.model('SellerUser', SellerUserSchema);
