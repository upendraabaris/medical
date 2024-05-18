const mongoose = require('mongoose');

const nbsuChiefComplaintSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NBSU_PATIENT_MASTER',
    // required: true,
  },
  nbsuRegNo: {
    type: String,
    // required: true,
  },
  compliant_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChiefComplaint',
  }],
//   datetime: {
//     type: Date,
//     default: Date.now,
//   },
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},
{
    timestamps: true
});

module.exports = mongoose.model('NBSU_Chief_Complaints_Transactions', nbsuChiefComplaintSchema);
