const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User', index: true },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref:'sellers' }, // Service Provider (Seller either Doctor/Hospital/Lab/Yoga Teacher/Travel Agent/Hotel)
  location: { type: String, required: true }, // Location
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-2-3-4-5)
  review: { type: String, required: true }, // Review (Text)
  photo: { type: String }, // Photo (URL of the photo)
  video: { type: String }, // Video (URL of the video)
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' } // Status (Approved/Pending/Rejected)
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
