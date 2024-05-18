const mongoose = require('mongoose');

const healthAssessmentQuestionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    question_type: {
        type: String,
        enum: ['radio', 'checkbox', 'text'], // Add more types as needed
        required: true
    },
    EN: {
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }]
    }
});

module.exports = mongoose.model('healthAssessmentQuestionSchema', healthAssessmentQuestionSchema);
