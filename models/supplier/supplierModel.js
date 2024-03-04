const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    // supplier_id: {type: Number, required: true, unique: true },
    supplier_name: { type: String, required: true },
    supplier_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SupplierType' },
    engagement_date: { type: String },
    engagement_letter: { type: String }
},
{
    timestamps: true,
})

module.exports = mongoose.model('supplier', supplierSchema)