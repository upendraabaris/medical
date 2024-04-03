const mongoose = require('mongoose')

const procedureSchema = new mongoose.Schema({
    // procedure_id: { type: Number, required: true, unique: true },
    medical_specialty_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "MedicalSpecialty", index:true},
    procedure_name: { type: String, required: true },
    short_description: { type: String },
    long_description: { type: String },
    procedure_video: { type: String },
    no_of_days_in_hospitalization: { type: String },
    estimatedprice_in_INR: { type: String },
    estimated_price_in_USD: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Procedure', procedureSchema)