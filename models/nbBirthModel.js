const mongoose = require('mongoose');

const newbornSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NBSU_PATIENT_MASTER'},
  criedImmediatelyAfterBirth: {
    type: Boolean,
    // required: true,
  },
  // weightAtBirth: {
  //   type: Number,
  //   required: true,
  // },
  gestationalAgeWeeks: {
    type: Number,
    // required: true,//in completed weeks 
  },
  maturity: {
    type: String,
    // enum: ['Preterm-Mild (34-37 Wk)', 'Preterm-Moderate(28-34 Wk)', 'Preterm-Severe (<28 Wk)','Term (37-42 Wk)'],
    // required: true,
  },
  resuscitationRequired: {
    type: Boolean,
    // required: true,
  },
  // resuscitationDetails: {
  //   type: String,
  //   default: '',
  // },
  //if resuscitationRequired true then resuscitationDetailsId its required
  resuscitationDetails: {
      type: String,
      // ref: 'Resuscitation_Option',
    },
  bagAndMaskValue: { type: Number },
  vitaminKGiven: {
    type: Boolean,
    // required: true,
  },
  breastfedWithinHour: {
    type: Boolean,
    // required: true,
  },
  babyInformationOnAdmission: { type: String },
  health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},{
  timestamps: true
});

module.exports = mongoose.model('NB_INFO_AT_BIRTH', newbornSchema);
