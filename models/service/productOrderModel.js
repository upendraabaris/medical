const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    // required: true,
    // unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // Enforce minimum quantity of 1
  },
  orderCurrency: {
    type: String,
    required: true,
    // enum: ['USD', 'INR', 'EUR', 'GBP', 'AUD']
  },
  amountPaid: {
    type: Number,
    required: true,
    min: 0.01 // Enforce minimum payment amount
  },
  orderDateTime: {
    type: Date,
    default: Date.now // Set timestamp on order creation
  },
  geolocation: {
    type: {
      type: String,
      enum: ['Point'] // Specify geometry type
    },
    coordinates: {
      type: [Number], // Array of longitude and latitude
      index: '2dsphere' // Create a 2dsphere index for geospatial queries
    }
  },
  comments: {
    type: String,
    trim: true // Remove leading/trailing whitespace
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sellers'
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('ProductOrder', orderSchema);
