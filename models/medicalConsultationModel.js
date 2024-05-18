const mongoose = require('mongoose')

const MedicalConsultationQuestion = new mongoose.Schema({
    category: { type: String, /* required: true */ },
    type:{ type: String },
    symptoms: { type: String, ref:'ChiefComplaint' /* required: true */ },
    // symptoms: { type: mongoose.Schema.Types.ObjectId, ref:'ChiefComplaint' /* required: true */ },
    img_banner: { type: String, /* required: true */},
    question: { type: String, /* required: true */ },
    options: [String]
})

module.exports = mongoose.model('Medical_Consultation_Question', MedicalConsultationQuestion);