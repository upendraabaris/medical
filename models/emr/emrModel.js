const mongoose = require('mongoose')

const emrSchema = new mongoose.Schema({
  emr_id: { type: Number, required: true, unique: true },
  chief_complaint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ChiefComplaints', required: true },
  medical_specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty', required: true },
  emr_question: { type: String, required: true },
  emr_question_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EmrQuestionType', required: true },
  emr_question_description: { type: String },
  emr_question_banner_image: { type: String },
  emr_question_banner_video: { type: String },
  emr_question_weitage: { type: Number },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Emr', emrSchema)