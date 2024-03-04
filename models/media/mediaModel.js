const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({
    media_id: { type: Number, required: true, unique: true },
    media_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaTypeMaster', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMaster', required: true },
    hospital_clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HospitalClinicMaster', required: true },
    award_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AwardMaster'},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductMaster' },
    date: { type: Date },
    venue: { type: String },
    specialnotes: { type: String },
    media_url: { type: String, required: true },
    blockchain_url: { type: String }
},
{
    timestamps: true,
})

const MediaMaster = mongoose.model('Media', mediaSchema);