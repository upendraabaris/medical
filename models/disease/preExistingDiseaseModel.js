const mongoose = require('mongoose');

const preexistingDiseaseSchema = new mongoose.Schema({
  sno: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true, ref: 'User' },
  disease_id: { type: Number, required: true, ref: 'Disease' },
})

module.exports = mongoose.model('PreExistingDisease', preexistingDiseaseSchema)