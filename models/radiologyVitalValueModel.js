const mongoose = require('mongoose');

const radiologySchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VitalCategory'
        // required: true
    },
    vital_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:''
        // required: true
    },
    vital_parameter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'KeyVital'
        // required: true
    },
    diagnostic_centre_id: {
        type: String,
        // required: true
    },
    health_facility_id: {
        type: String,
        // required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    // transaction_id: {
    //     type: String,
    //     // required: true
    // },
    test_date: {
        type: Date,
        // required: true
    },
    uploaded_report: {
        type: String,
        // required: true
    },
    uploaded_interpretation: {
        type: String,
        // required: true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('RadiologyVitalValue', radiologySchema);
