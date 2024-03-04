const mongoose = require("mongoose");

const clientDocumentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qualification: { type: String },
    passing: { type: String },
    stream: { type: String },
    subject: { type: String },
    passing_year: { type: Number },
    roll_no: { type: String },
    enrollment_no: { type: String },
    marksheet_sl_no: { type: String },
    certificate_no: { type: String },
    greading_system: { type: String },
    CGPA: { type: Number },
    institute_name: { type: String },
    institute_address: { type: String },
    passing_state: { type: String },
    passing_date: { type: Date },
    total_marks: { type: String },
    obtain_mark: { type: String },
    mark_per: { type: String },
    devision: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
  },
  {
    timestamps: true,
  }
)

clientDocumentSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

module.exports = mongoose.model("clientDocument", clientDocumentSchema);