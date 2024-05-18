const mongoose = require('mongoose');

const healthProfileSchema = new mongoose.Schema({
  category: String,
  title: String,
  sub_title: String,
  points: [{
    title: String,
    sub_points: [{
      title: String,
      points: [String]
    }]
  }]
});

module.exports = mongoose.model('HealthProfileIButton', healthProfileSchema);
