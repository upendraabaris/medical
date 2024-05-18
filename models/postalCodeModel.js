const mongoose = require('mongoose');

const postalCodeSchema = new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    postalCode: { type: String }
});

module.exports = mongoose.model('postalCode', postalCodeSchema);
