const mongoose = require("mongoose");

const otherDocumentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    document_type: { type: String },
    category_certiflcate_issuing_authority: { type: String },
    category_date_of_issue: { type: Date },
    category_application_no: { type: String },
    category_certificate_no: { type: String },
    disability_certiflcate_issuing_authority: { type: String },
    disability_date_of_issue: { type: Date },
    disability_application_no: { type: String },
    disability_certificate_no: { type: String },
    domicile_certiflcate_issuing_authority: { type: String },
    domicile_date_of_issue: { type: Date },
    domicile_application_no: { type: String },
    domicile_certificate_no: { type: String },
    income_certiflcate_issuing_authority: { type: String },
    income_date_of_issue: { type: Date },
    income_application_no: { type: String },
    income_certificate_no: { type: String },
    birth_certiflcate_issuing_authority: { type: String },
    birth_date_of_issue: { type: Date },
    birth_application_no: { type: String },
    birth_certificate_no: { type: String },
    family_annual_income: { type: Number },
    type_of_photo_id: { type: String },
    photo_id_number: { type: String },
    aadhaar_card_status: { type: String },
    aadhaar_card_number: { type: String },
    aadhar_virtual_id: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
  },
  {
    timestamps: true,
  }
);

otherDocumentSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

otherDocumentSchema.index({
  user_id: 1,
});

module.exports = mongoose.model("clientOtherDocument", otherDocumentSchema);
