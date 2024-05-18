const mongoose = require('mongoose');

const RadiologyDiagnosisMasterSchema = new mongoose.Schema({
  vitalParameterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'KeyVital'//vital parameter id get from KeyVital master
  },
  radiologyDiagnosisName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RadiologyDiagnosis', RadiologyDiagnosisMasterSchema);
