const mongoose = require("mongoose");

const userDocumentSchema = new mongoose.Schema({
    category: { type: String/* , required: true */ },
    complaints: { type: String/* , required: true */ },
    clinicalDiagnosis: { type: String/* , required: true */ },
    doctorName: { type: String/* , required: true */ },
    hospitalClinicName: { type: String/* , required: true */ },
    fileDate: { type: Date/* , required: true */ },
    feeAmountPaid: { type: Number/* , required: true */ },
    fileTitle: { type: String/* , required: true */ },
    isLatest: { type: Boolean, default: false },
    reportType: { type: String/* , required: true */ },
    linkDoctorPrescription: { type: String },
    pathologyLabName: { type: String/* , required: true */ },
    categoryDocumentType: { type: String/* , required: true */ },
    selectFamilyMember: { type: String },
    vaccinationType: { type: String/* , required: true */ },
    expiryDate: { type: Date/* , required: true */ },
    insurerCompanyName: { type: String/* , required: true */ },
    insuranceType: { type: String, /* enum: ['Health/Medical Insurance', 'Life Insurance'], */ },
    selectProcedure: { type: String },
    document: [{ type: String , required: true }],
    // insurance_policy: [{ type: String, required: true }],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("userDocument", userDocumentSchema)







// adhaar_front_card: { type: String, require: [true, "Adhaar card Front doc is a must"] },
// adhaar_back_card: { type: String, require: [true, "Adhaar card Back doc is a must"] },
// pan_card: { type: String, require: [true, "Pan card doc is a must"] },
// gst: { type: String },
// bank_proof: { type: String, require: [true, "Bank Proof is a must"] },