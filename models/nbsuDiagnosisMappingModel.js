const mongoose = require('mongoose');

const diagnosisMappingSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NBSU_PATIENT_MASTER', // Reference the Patient model (optional)
    required: true,
  },
  diagnosis_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClinicalDiagnosis', // Reference the Diagnosis model (optional)
    required: true,
  }],
  health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerUser'}
},
{
    timestamps: true
});

module.exports = mongoose.model('Nbsu_diagnosis_mapping', diagnosisMappingSchema);

