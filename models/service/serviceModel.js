const mongoose = require('mongoose');

const serviceMasterSchema = new mongoose.Schema({
  service_id: { type: Number, unique: true, required: true },
  service_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProductCategoryMaster', required: true },
  service_title: { type: String, required: true },
  service_pic: { type: String },
  short_description: { type: String },
  long_description: { type: String },
  service_charges_INR: { type: Number },
  service_charges_USD: { type: Number },
},
{
  timestamps: true,
})

module.exports = mongoose.model('ServiceMaster', serviceMasterSchema);
