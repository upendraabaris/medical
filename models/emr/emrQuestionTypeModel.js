const mongoose = require('mongoose')

const emrQuestionTypeSchema = new mongoose.Schema({
    emr_question_type_id: { type: Number, required: true, unique: true },
    emr_question_type: { type: String, required: true },
})

module.exports = mongoose.model('EMRQuestionType', emrQuestionTypeSchema);