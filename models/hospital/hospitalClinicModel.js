const mongoose = require('mongoose');

const hospitalClinicSchema = new mongoose.Schema({
    // hos_clinic_id: { type: Number, required: true },
    parent_hos_clinic_id: { type: Number, required: false },
    hos_clinic_name: { type: String, required: true },
    hos_clinic_type_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "HospitalClinicType" },
    accreditations: { type: String },
    brief_description: { type: String },
    profile: { type: String, required: true },
    special_note: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('HospitalClinic', hospitalClinicSchema);
