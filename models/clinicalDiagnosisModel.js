const mongoose = require('mongoose');

const clinicalDiagnosisSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ClinicalDiagnosis', clinicalDiagnosisSchema);
