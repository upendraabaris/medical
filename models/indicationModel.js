const mongoose = require('mongoose');

const indicationSchema = new mongoose.Schema({
    indication_name: { type: String, required: true },
    category: { type:  String }
});

module.exports = mongoose.model('Indication', indicationSchema);


// Indication for admission schema