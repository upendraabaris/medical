const mongoose = require("mongoose")

const systemicExaminationSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NBSU_PATIENT_MASTER',
        // required: true,
      },
    cvs: { type: String },//string
    perAbdomen: { type: String },//string
    respiratory: { type: String },//string
    cns: { type: String },//string
    otherSignificantFinding: { type: String },//string
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},
{
    timestamps: true
})

module.exports = mongoose.model('SystemicExamination', systemicExaminationSchema)