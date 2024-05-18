const mongoose = require('mongoose');

const doctorAttendantSchema = new mongoose.Schema({
    attendantName: { type: String, required: true },
    associateHospitalName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sellers' }],
    associateDoctorName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sellers' }],
    mobile: { type: String },
    email: { type: String },
    profileImage: { type: String } // Assuming the profile image will be stored as a URL
});

module.exports = mongoose.model('DoctorAttendant', doctorAttendantSchema);
