const mongoose = require("mongoose")

const nbsuPatientMasterSchema = new mongoose.Schema({
    health_facility_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers'}, //selller id hospital ki
    nbsu_reg_no: { type: Number },
    doctor_incharge: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },    //sellers from the selected health_facility_id
    rch_no: { type: Number, maxlength: 999999999999 },
    mother_name: { type: String },
    father_name: { type: String },
    category: { type: String, enum: ['General','OBC','ST','SC'] },
    complete_address: { type: String },
    viilage: { type: String },
    ward_no: { type: Number },
    contact_number1: { type: Number },
    contact_number2: { type: Number },
    relation1:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserRelation' },
    relation2: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRelation' },
    sex_of_born_baby: { type: String, enum: ['Male', 'Female', 'Others', 'Ambiguous']},
    dob: { type: Date },
    timeOfBirth: { type: String, default: Date.now },
    birthWeight: { type: Number },//kgs
    date_of_admission: { type: Date },
    // time_of_admission: { type: Date, default: Date.now },
    time_of_admission: { type: String, default: new Date().toLocaleTimeString() },
    age_at_the_time_of_admission: { type: String },
    weight_at_the_time_of_admission: { type: Number },
    date_at_the_time_of_discharge: { type: Date },
    time_of_discharge: { type: String, default: new Date().toLocaleTimeString() },
    age_at_the_time_of_discharge: { type: Number },
    weight_at_the_time_of_discharge: { type: Number},
    type_of_admission: { type: mongoose.Schema.Types.ObjectId, ref: 'admissionType'  },
    place_of_delivery: { type: String, enum:['Home', 'Ambulance', 'Private Hospital', 'Government Hospital' ] },
    //if user select place of delivery "govt hospital" or "private hospital" the show the below hospital_name 
    hospital_name: { type: String },
    reffered_from: { type: String }, //normal text
    mode_of_transport: { type: String , enum: ['Self Arranged', 'Government Provided']},
    // patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerUser'}
},{
    timestamps:true
})

module.exports = mongoose.model("NBSU_PATIENT_MASTER", nbsuPatientMasterSchema)



// const yourSchema = new mongoose.Schema({
//     rch_no: {
//       type: Number,
//       validate: {
//         validator: function(v) {
//           return /^\d{12}$/.test(v);
//         },
//         message: props => `${props.value} is not a valid 12-digit number!`
//       }
//     }
//   });
  