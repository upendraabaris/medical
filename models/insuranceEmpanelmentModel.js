const mongoose = require('mongoose');

const insuranceEmpanelmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Field for insurance empanelment
  logo: { type: String }
});

module.exports = mongoose.model('InsuranceEmpanelment', insuranceEmpanelmentSchema);
