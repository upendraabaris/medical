const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  // user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User', index: true},
  // vital_category: { type: mongoose.Schema.Types.ObjectId, ref:'VitalCategory', required: true },
  // selected_member: { type: mongoose.Schema.Types.ObjectId, ref:'User', index: true },
  // test_date: { type: Date, default: Date.now },
  // height: { type: Number, required: true }, // in feet
  // weight: { type: Number, required: true }, // in kgs
  // pathology_values: { type: Number, min: 0, max: 30, required: true } // 0-30 kg/m2

  vital_category_id: {
    type: String,
    // required: true
  },
  vital_group_id: {
    type: String,
    // required: true
  },
  // vital_parameter_id: {
  //   type: String,
  //   // required: true
  // },
  vital_parameter: {
    type: String
  },
  unit: {
    type: String,
    // required: true
  },
  normal_value_min: {
    type: Number,
    // required: true
  },
  normal_value_max: {
    type: Number,
    validate: {
      validator: function (value) {
        return value > this.normal_value_min;
      },
      message: 'Normal value max must be greater than normal value min.'
    }
  }

});


// normalValueMax: {
//   type: Number,
//   required: true,
//   validate: {
//     validator: function(value) {
//       return value > this.normalValueMin;
//     },
//     message: 'Normal value max must be greater than normal value min.'
//   }
// }

module.exports = mongoose.model('KeyVital', vitalSchema);
