const mongoose = require('mongoose');

const CountryLanguageMappingSchema = new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    language_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'language' }]
});

module.exports = mongoose.model('CountryLanguageMapping', CountryLanguageMappingSchema);

