const mongoose = require("mongoose");

const physicalSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    identity_mark1: { type: String },
    identity_mark2: { type: String },
    NCC: { type: String },
    sports: { type: String },
    blood_group: { type: String },
    colour_complex: { type: String },
    physical_disability: { type: String },
    type_of_disability: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
  },
  {
    timestamps: true,
  }
);

physicalSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

physicalSchema.index({
  user_id: 1,
});

module.exports = mongoose.model("clientPhysicalElegibility", physicalSchema);
