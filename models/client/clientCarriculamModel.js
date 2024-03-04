const mongoose = require("mongoose");

const curricullamSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    games: { type: String },
    hobbies: { type: String },
    runing: { type: String },
    sweeming: { type: String },
    high_jump: { type: String },
    long_jump: { type: String },
    utthak_baithak: { type: String },
    first_language: { type: String },
    second_language: { type: String },
    typing: { type: String },
    stenographer: { type: String },
    speeking_language: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
  },
  {
    timestamps: true,
  }
);

curricullamSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

curricullamSchema.index({
  user_id: 1,
});

module.exports = mongoose.model("client_extraCurricullam", curricullamSchema);
