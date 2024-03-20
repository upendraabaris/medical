const mongoose = require('mongoose');

const staffTypeSchema = new mongoose.Schema({
  staff_type: { type: String, unique: true, required: true },
  description: { type: String },
  // You can add more fields as needed, such as permissions or privileges
}, { timestamps: true });

module.exports = mongoose.model('StaffType', staffTypeSchema);
