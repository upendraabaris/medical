const router = require("express").Router()

const {getEmrPictureGallery, getEmrPictureGalleryById, addEmrPictureGallery, updateEmrPictureGallery, deleteEmrPictureGallery} = require("../../controllers/emr/emrPictureGalleryCtrl")

router.get('/', getEmrPictureGallery)

router.get('/:id', getEmrPictureGalleryById)

router.post('/addEmrPictureGallery', addEmrPictureGallery)

router.put('/updateEmrPictureGallery/:id', updateEmrPictureGallery)

router.delete('/deleteEmrPictureGallery/:id', deleteEmrPictureGallery)

module.exports = router