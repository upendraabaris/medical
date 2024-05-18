const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amountPaid: {
        type: Boolean,
        default: false
    },
    counter: {
        type: Number
    }
});

// eventBookingSchema.pre('save', async function (next) {
//     try {
//       const eventBooking = this;
//       const event = await mongoose.model('Event').findById(eventBooking.eventId);
  
//       if (!event || event.availableSlots <= 0) {
//         return next(new Error('No slots are available for this event.'));
//       }
  
//       const bookingCount = await mongoose.model('EventBooking').countDocuments({ eventId: eventBooking.eventId });
//       eventBooking.counter = bookingCount + 1;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });


// eventBookingModel.js
// eventBookingSchema.pre('save', async function(next) {
//   try {
//     const event = await mongoose.model('Event').findById(this.eventId);
//     if (!event) {
//       throw new Error('Event not found');
//     }
    
//     if (event.availableSlots <= 0) {
//       throw new Error('No available slots');
//     }
    
//     event.availableSlots -= 1;
//     await event.save();
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


eventBookingSchema.pre('save', async function(next) {
  try {
    const eventBooking = this
    const event = await mongoose.model('Event').findById(this.eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    if (event.availableSlots <= 0) {
      throw new Error('No available slots');
    }
    
    event.availableSlots -= 1;
    await event.save();
    
    // Increment the counter
    const bookingCount = await mongoose.model('EventBooking').countDocuments({ eventId: eventBooking.eventId });
      eventBooking.counter = bookingCount + 1
    next();
  } catch (error) {
    next(error);
  }
});



module.exports = mongoose.model('EventBooking', eventBookingSchema);
