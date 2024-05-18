const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PostType', required: true },
    title: { type: String, required: true },
    publish_date: { type: Date, default: Date.now },
    publisher: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    speciality_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty' },
    sub_speciality_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSpeciality' }],
    video_url: { type: String },
    // video_thumbnail: { type: String }, // Store thumbnail URL here
    active: { type: Boolean, default: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
    // description: { type: String },
    // subject: {  type: String },
    // images: [{ public_id: { type: String }, url: { type: String } }],
    // user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // isDelete: { type: Boolean, default: false },
    views: { type: Number }
}, {
    timestamps: true
});

// Add a pre-save hook to extract video thumbnail
postSchema.pre('save', async function(next) {
    try {
      if (this.video_url) {
        // Your code to extract video thumbnail from video_url goes here
        // For example:
        // this.video_thumbnail = await extractVideoThumbnail(this.video_url);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  


module.exports = mongoose.model("Post", postSchema);