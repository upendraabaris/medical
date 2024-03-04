const mongoose = require('mongoose')

const financeSchema = new mongoose.Schema({
  sno: { type: Number, required: true, unique: true },
  order_id: { type: Number,required: true, ref: 'ServiceTransaction' },
  currencyid: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required: true },
  invoice_amount: { type: Number, required: true },
  receipt_amount: { type: Number, required: true },
  receipt_mode: { type: String },
  provsional_invoice_url: { type: String },
  receipt_url: { type: String },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Finance', financeSchema);
