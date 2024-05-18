const mongoose = require("mongoose")

const sellerServicesMappingSchema  = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true
      },
      service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceMaster',
        required: true
      },
      targetBeneficiary: {
        type: String,
        // enum: ['Indian', 'Foreigner', 'Both'],
        required: true
      },
      feeForIndianBeneficiary: {
        type: Number,
        required: true
      },
      feeForForeignerBeneficiary: {
        type: Number,
        required: true
      }
})

module.exports = mongoose.model('sellerServicesMapping', sellerServicesMappingSchema)
