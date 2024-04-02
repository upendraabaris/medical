const mongoose = require('mongoose');

const patientVitalInfoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    height: {
        feet: { type: Number, required: true },
        inches: { type: Number, required: true }
    },
    weight: { type: Number, required: true },
    pulseRate: { type: Number, min: 60, max: 100, required: true },
    respiratoryRate: { type: Number, min: 12, max: 16, required: true },
    bodyTemperature: { type: Number, min: 90, max: 105, required: true },
    bloodPressure: {
        systolic: { type: Number, required: true },
        diastolic: { type: Number, required: true }
    },
    oxygenSaturation: { type: Number, min: 70, max: 100, required: true },
    dateTime: { type: Date, default: Date.now }
},
{
    timestamps: true,
});

module.exports = mongoose.model('PatientVitalInformation', patientVitalInfoSchema);