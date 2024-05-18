const mongoose = require("mongoose")

const generalExaminationSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NBSU_PATIENT_MASTER'},
    general_condition: { 
        type: String,
    enum: ['Alert', 'Lethargic', 'Comatose']
    },
    bodyTemperature: {
        type: Number
    },
    heart_rate: { type: Number },
    apnea: { 
        type: Boolean,
        default: false,
    },
    // respiratory_rate:{ 
    //     type: Number
    // },
    respiratoryRate: { type: Number, /* min: 12, max: 16 *//* , required: true */ },
    // bp:{
    //     type: Number
    // },
    bloodPressure: {
        systolic: { type: Number/* , required: true */ },
        diastolic: { type: Number/* , required: true */ }
    },
    grunting: { type: Boolean, default: false },
    chest_indrawing: { type: Boolean, default: false },
    head_circumference: { type: Number },
    length: { type: Number },
    color: { 
        type: String,
        enum: ['Pink','Pale','Central Cyanosis', 'Peripheral Cyanosis']
    },
    CRT:{ type: Boolean, default: false },
    skin_pinch:{ type: Boolean, default: false },
    meconiumStainedCord: { type: Boolean, default: false },
    cry:{
        type: String,
        enum:[ 'Absent', 'Feeble', 'Normal', 'High Pitch']
    },
    Tone: {
        type: String,
        enum: ['Limp', 'Active', 'Increase Tone']
    },
    convulsions: {
        type: String,
        enum: ['Present on Admission', 'Past History', 'No']
    },
    takingBreastFeeds: { type: Boolean, default: false },
    Sucking: { 
        type: String,
        enum: ['Good', 'Poor', 'No Sucking']
    },
    attachment: {
        type: String,
        enum:['Well attached', 'Poorly attached', 'Not attached']
    },
    bleedingStatus:{
        type: Boolean,
        default: false
    },
    bleeding:{
        type: String,
        enum: ['Skin', 'Mouth', 'Rectal','Umbilicus']
    },
    jaundiceStatus:{
        type: Boolean,
         default: false 
    },
    jaundice:{
        type: String,
        enum: ['Face', 'Chest', 'Abdomen', 'Legs', 'Plams', 'Soles']
    },
    umbilicus:{
        type: String,
        enum:['Red', 'Discharge', 'Normal']
    },
    skinPustules:{
        type: String,
        // enum:['No','Yes','Yes >= 10 Abscess/Congenital']
    },
    bulgingAnteriorFontanel:{
        type: Boolean,
        default: false
    },
    malformationStatus: {
        type: Boolean,
        default: false
    },
    malformation: {
        type: String,
        // enum: []
    },
    bloodSugar:{
        type: Number
    },
    oxygenSaturation:{
        type: Number
    },
    otherSignificantInformation:{
        type: String
    },
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'},
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref:'SellerUser'} //which seller enter the data under health_facility_id
},
{
    timestamps: true
})

module.exports = mongoose.model('GeneralExamination', generalExaminationSchema)