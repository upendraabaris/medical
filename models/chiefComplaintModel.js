const mongoose = require('mongoose')

const chiefComplaintSchema = new mongoose.Schema({
  chief_compliant_id: { type: Number, required: true, unique: true },
  chief_complaint: { type: String, required: true },
  chief_complaint_banner_image: { type: String },
  chief_complaint_banner_video: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model('ChiefComplaint', chiefComplaintSchema)



// chief_complaint_banner_image: { type: String, validate: /^https?:\/\// }, // Assuming a URL format
//   chief_complaint_banner_video: { type: String, validate: /^https?:\/\// }, // Assuming a URL format