const mongoose = require("mongoose");

const basicSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  old_registration: { type: String },
  customer_title: { type: String },
  firstname: { type: String },
  middlename: { type: String },
  lastname: { type: String },
  father_firstname: { type: String },
  father_middlename: { type: String },
  father_lastname: { type: String },
  mother_firstname: { type: String },
  mother_middlename: { type: String },
  mother_lastname: { type: String },
  guardian_firstname: { type: String },
  guardian_middlename: { type: String },
  guardian_lastname: { type: String },
  husband_firstname: { type: String },
  husband_middlename: { type: String },
  husband_lastname: { type: String },
  dob_date: { type: Date },
  marital_status: { type: Boolean, default: false },
  category: { type: String },
  gender: { type: String },
  religion: { type: String },
  seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
});

basicSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

basicSchema.index({
  user_id: 1,
});

module.exports = mongoose.model("clientBasic", basicSchema);
