const mongoose = require('mongoose')

const supplierTypeSchema = new mongoose.Schema({
  // supplier_type_id: { type: Number, required: true, unique: true },
  supplier_type: { type: String, required: true },
},
{
  timestamps: true,
})

module.exports = mongoose.model('SupplierType', supplierTypeSchema)
