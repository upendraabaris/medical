const mongoose = require("mongoose")

const patientIndicationMapping = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref:'NBSU_PATIENT_MASTER' },
    indication_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Indication' }],
    nbsuRegNo: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        // required: true,
      },
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},{
    timestamps: true
})

module.exports = mongoose.model('PatientIndicationMapping', patientIndicationMapping)