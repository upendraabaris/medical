const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the file (e.g., "Insurance Policy Doc")
    fileURL: { type: String, required: true } // URL or path to the uploaded file
});

const sosApplicationFormSchema = new mongoose.Schema({
    preExistingHealthIssue: { type: String }, // Free-text input for pre-existing health issues
    physicianDetails: {
        name: { type: String },
        phone: { type: String }
    },
    emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    isInsured: { type: Boolean, required: true },
    insurancePanel: { type: String }, // e.g., TPA (Third Party Administrator)
    insuranceCompany: { type: String },
    insurerExpiryDate: { type: Date },
    uploadedFiles: [fileSchema] // Array to store uploaded files
});

module.exports = mongoose.model('SOSApplicationForm', sosApplicationFormSchema)
