const mongoose = require('mongoose');

const userHealthProfileSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question_answer: [{ question:{ type:String }, answers: [{ type: String }], questionType: { type: String }}],
  category: { type: String, required: true },
  updated_date: { type: Date, default: Date.now }
},
{
    timestamps: true
});

module.exports = mongoose.model('userHealthProfile', userHealthProfileSchema);
