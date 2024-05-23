const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    index: true
    // required: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  longDescription: {
    type: String,
    trim: true
  },
  priceUSD: {
    type: Number,
    required: true,
    min: 0 // Enforce a minimum price of $0
  },
  priceINR: {
    type: Number,
    required: true,
    min: 0 // Enforce a minimum price of ₹0
  },
  offerStartDate: {
    type: Date
  },
  offerEndDate: {
    type: Date
  },
  offerPriceUSD: {
    type: Number,
    min: 0 // Enforce a minimum offer price of $0
  },
  offerPriceINR: {
    type: Number,
    min: 0 // Enforce a minimum offer price of ₹0
  },
  availableInIndia: {
    type: Boolean,
    required: true,
    default: false // Default to 'no' for consistency
  },
  availableOutsideIndia: {
    type: Boolean,
    required: true,
    default: false // Default to 'no' for consistency
  },
  productImages: {
    type: [String],
    trim: true, // Remove leading/trailing whitespace from image URLs
    validate: {
      validator: (images) => images.length <= 5, // Allow up to 5 images
      message: 'Maximum of 5 product images allowed'
    }
  },
  productVideoLink: {
    type: String,
    trim: true,
    // validate: {
    //   validator: (link) => {
    //     // Basic URL validation (can be enhanced for specific video platforms)
    //     return /^(https?:\/\/)?[\w.-]+\.[a-z]{2,6}(?:\/\w+)*#?$/i.test(link);
    //   },
    //   message: 'Invalid product video link format'
    // }
  },
  total_quantity: { type: Number, default: 1 }
},{
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
