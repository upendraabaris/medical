const mongoose = require('mongoose');

const vitalCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('VitalCategory', vitalCategorySchema)
