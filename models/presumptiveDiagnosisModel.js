const mongoose = require('mongoose');

const PresumptiveDiagnosisSchema = new mongoose.Schema({
    presumptiveDiagnosis: {
        type: String,
        required: true
    },
    presumptiveDiagnosisCode: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('PresumptiveDiagnosis', PresumptiveDiagnosisSchema);
