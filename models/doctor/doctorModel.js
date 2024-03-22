const mongoose = require("mongoose")

const doctorMasterSchema = new mongoose.Schema({
    isfavorite: { type: Boolean, default: false },
    referring_user_id: { type: Number, ref: 'User' },
    user_id: { type: Number, ref: 'User' },
    is_surgeon: { type: Boolean, default: false },
    zone_id: { type: Number, ref: 'ZoneMaster' },
    is_super30: { type: Boolean, default: false },
    name: { type: String, required: true, ref: 'User' }, // firstname+secondname+lastname from user master
    medicine_type_id: { type: Number, ref: 'MedicineType' },
    medical_specialty_id: { type: Number, ref: 'MedicalSpecialty' },
    qualifications: { type: String },
    profilepic: { type: String, /* validate: /^https?:\/\//i  */},
    briefbio: { type: String },
    doctorbio: { type: String },
    doctor_fee_IND: { type: Number },
    doctor_fee_INT: { type: Number },
    superSpecializationIds: [{ type: Number, ref: 'SuperSpecialization' }]
})

module.exports = mongoose.model('DoctorMaster', doctorMasterSchema)
