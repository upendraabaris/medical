const mongoose = require('mongoose');
const { Schema } = mongoose;

const productPostalCodeMappingSchema = new Schema({
//   mappingId: {
//     type: String,
//     // required: true,
//     unique: true
//   },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ProductPostalCodeMapping', productPostalCodeMappingSchema);
