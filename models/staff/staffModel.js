const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const staffSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String },
  password: { type: String },
  staff_type_id: { type: mongoose.Schema.Types.ObjectId , ref: "stafftype"},
  profile_pic: { type: String },
  // role: { type: String, default: 'staff' },
  is_active: { type: Boolean, default: true },
  // Add more staff-specific fields as needed
}, { timestamps: true });

staffSchema.pre("save", async function(next){
  try{
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10)
    }
    next()
  }catch(error){
    next(error)
  }
});

module.exports = mongoose.model('Staff', staffSchema);
