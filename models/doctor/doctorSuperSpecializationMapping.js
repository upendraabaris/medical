const mongoose = require("mongoose")

const doctorSuperSpecializationMappingSchema = new mongoose.Schema({
    sno: { type: Number, required: true },
    docid: { type: Number, ref: 'DoctorMaster', required: true },
    superspecializationid: { type: Number, ref: 'SuperSpecializationMaster', required: true },
})

module.exports = mongoose.model('DoctorSuperSpecializationMapping', doctorSuperSpecializationMappingSchema);
