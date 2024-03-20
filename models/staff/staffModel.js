const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: 'staff' },
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
