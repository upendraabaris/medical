const mongoose = require("mongoose")

const nbsuMedicationSchema = new mongoose.Schema({
    patient_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'NBSU_PATIENT_MASTER'
    },
    doctor_incharge: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'sellers'
    },
    medication_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'MedicationMaster'
    }],
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'}, //which seller enter the data under health_facility_id
    dateTime: { type: Date, default: Date.now() }
},
{
    timestamps: true
})

module.exports = mongoose.model("nbsuMedication",nbsuMedicationSchema)