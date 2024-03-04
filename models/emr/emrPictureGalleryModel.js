const mongoose = require('mongoose')

const emrPictureGallerySchema = new mongoose.Schema({
    emr_pic_id: { type: Number, required: true, unique: true },
    emr_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EMRMaster' }, // reference to EMR MASTER
    emr_picture: { type: String, required: true }, // URL for the EMR picture
})

module.exports = mongoose.model('EmrPictureGallery', emrPictureGallerySchema)
