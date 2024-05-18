const mongoose = require('mongoose');

const StateLanguageMappingSchema = new mongoose.Schema({
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    language_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'language' }]
});

module.exports = mongoose.model('StateLanguageMapping', StateLanguageMappingSchema);

