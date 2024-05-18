const mongoose = require('mongoose');

const sosContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contactNumber: [{
    type: String,
    required: true,
  }],
});

// Set the limit using a pre-save hook or mongoose middleware
// sosContactSchema.pre('save', async function(next) {
//   const contactCount = await mongoose.model('SOS_Contact').countDocuments({ userId: this.userId });
//   if (contactCount >= 5) {
//     return next(new Error('Maximum of 5 SOS contacts allowed.'));
//   }
//   next();
// });

sosContactSchema.pre('save', function(next) {
  if (this.contactNumber.length >= 5) {
    return next(new Error('Maximum of 5 SOS contacts allowed.'));
  }
  next();
});

module.exports = mongoose.model('SOS_Contact', sosContactSchema);
