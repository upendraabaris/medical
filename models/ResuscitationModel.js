const mongoose = require('mongoose');

const resuscitationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Resuscitation_Option', resuscitationSchema);
