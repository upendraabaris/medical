const mongoose = require('mongoose');
const { SchemaTypes } = mongoose; // Destructure SchemaTypes for brevity

const radiologyAbnormalValueSchema = new mongoose.Schema({
  radiology_vital_value_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RadiologyVitalValue',
    required: true
  },//radiology_vital_value_id (transaction id)
  radiology_diagnosis_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RadiologyDiagnosis',
    required: true
  }]
},
{
    timestamps: true
});

module.exports = mongoose.model('RadiologyAbnormalValue', radiologyAbnormalValueSchema);
