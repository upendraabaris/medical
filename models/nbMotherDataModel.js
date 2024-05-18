const mongoose = require('mongoose');

const NBMotherDataSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NBSU_PATIENT_MASTER'},
    motherAge: {
        type: Number,
        // required: true
    },
    motherWeight: {
        type: Number,
        // required: true
    },
    ageAtMarriage: {
        type: Number,
        // required: true
    },
    birthSpacing: {
        type: String,
        enum: ['< 1 Yr', '1-2 Yr', '>2-3 Yr', '> 3 Yr', 'Not Applicable'],
        // required: true
    },
    gravida: {
        type: Number,
        // required: true
    },
    parity: {
        type: Number,
        // required: true
    },
    liveChildren: {
        type: Number,
        // required: true
    },
    abortion: {
        type: Number,
        // required: true
    },
    LMP: {
        type: Date,
        // required: true
    },
    EDD: {
        type: Date,
        // required: true
    },
    gestationWeeks: {
        type: Number,
        // enum: ['35-36 weeks', '36-37 weeks', '37-38 weeks', '38-39 weeks', '39-40 weeks']
        // required: true
    },
    antenatalVisits: {
        type: String,
        enum: ['None', '1', '2', '3', '4'],
        // required: true
    },
    TTDoses: {
        type: String,
        enum: ['None', '1', '2'],
        // required: true
    },
    Hb: {
        type: String
        // enum: ['Below 10g/DL', '10-12g/DL', '12-16g/DL']
    },
    bloodGroup: {
        type: String
    },
    gestationalHypertensionStatus: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    gestationalHypertension: {
        type: String,
        enum: ['Hypertension', 'Pre Eclampsia', 'Eclampsia'],
        // required: true
    },
    PIH:{
        type: String,
        enum: ['Hypertension', 'Pre Eclampsia', 'Eclampsia'],
    },
    PPH: {
        type: String,
        enum: ['No', 'Yes'],
        // required: true
    },
    drug: {
        type: String,
        enum: ['No', 'Yes']
    },
    APH: {
        type: String,
        enum: ['Yes', 'No'],
        // required: true
    },
    illness: {
        type: String,
        // enum:['Malaria', 'T.B.', 'Jaundice']
    },
    otherIllness: {
        type: String,
    },
    GDM: {
        type: String,
        enum: ['Yes', 'No'],
        // required: true
    },
    VDRL: {
        type: String,
        enum: ['Not Done', '+Ve', '-Ve']
    },
    HbsAg: {
        type: String,
        enum: ['Not Done', '+Ve', '-Ve']
    },
    HIVTesting: {
        type: String,
        enum: ['Not Done', '+Ve', '-Ve']
    },
    antenatalSteroids: {
        type: String,
        enum: ['Yes', 'No'],
        // required: true
    },
    antenatalSteroidsIfYes:{
        type: String
    },
    numberOfDoses: {
        type: Number
    },
    foulSmellingDischarge: {
        type: String,
        enum: ['Yes', 'No']
    },
    leakingPV12Hours: {
        type: String,
        enum: ['Yes', 'No']
    },
    courseOfLabour: {
        type: String,
        enum: ['Uneventful', 'Prolonged 1st stage', 'Prolonged 2nd stage', 'Obstructed']
    },
    fetalDistress: {
        type: String,
        enum: ['Yes', 'No']
    },
    typeOfDelivery: {
        type: String,
        enum: ['LSCS', 'AVD', 'NVD']
    },
    indicationForCaesarean: {
        type: String
    },
    deliveryAttendedBy: {
        type: String,
        enum: ['Doctor', 'Nurse', 'ANM', 'Dai', 'Relative']
    },
    lastDoseTime: { type: Date, /* required: true */ },
    deliveryTime: { type: Date, /* required: true */ },
    thyroid: { type: String, enum: ['Euthyroid (N)', 'Hypothyroid', 'Hyperthyroid', 'Not Known'] },
    labour: { type: String },
    uterineTenderness: { type: String, enum: ['Yes', 'No'] },
    presentation: { type: String, enum: ['Vertex', 'Breech', 'Transverse']},
    HOFever: { type: String },
    amnioticFluid: { type: String, enum: ['Clear', 'Blood Stained', 'Meconium Stained', 'Foul Smelling']},
    otherInformation: { type: String },
    RPRSyphilis: { type: String, enum: ['Not Done', '+Ve', '-Ve'] },
    consanguinity: {
        type: String,
        enum: ['Yes', 'No']
    },
    timeBetweenLastDoseAndDelivery: {
        type: Number, // Stores the difference in hours
      },
      health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},{
    timestamps: true
});

module.exports = mongoose.model('NBMotherData', NBMotherDataSchema);
