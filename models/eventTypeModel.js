const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
    event_type: { type: String, required: true }
});

module.exports = mongoose.model('EventType', eventTypeSchema);


// event_type: { type: String, enum: ['OPD', 'Surgical Camp', 'CME'], required: true }