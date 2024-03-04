const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the file (e.g., "Insurance Policy Doc")
    fileURL: { type: String, required: true } // URL or path to the uploaded file
});

const userInsuranceSchema = new mongoose.Schema({
    insurerExpiryDate: { type: Date }, // Expiry date of the insurance
    insurancePolicyDoc: fileSchema,
    medicalPrescription: fileSchema,
    identificationCard: fileSchema,
    authorizationLetter: fileSchema,
    healthSchemeCard: fileSchema,
});

module.exports = mongoose.model('UserInsurance', userInsuranceSchema)
