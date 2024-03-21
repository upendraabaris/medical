const router = require("express").Router()

const {getEmrPictureGallery, getEmrPictureGalleryById, addEmrPictureGallery, updateEmrPictureGallery, deleteEmrPictureGallery} = require("../../controllers/emr/emrPictureGalleryCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getEmrPictureGallery)

router.get('/:id', staffMiddleware, getEmrPictureGalleryById)

router.post('/addEmrPictureGallery', staffMiddleware, addEmrPictureGallery)

router.put('/updateEmrPictureGallery/:id', staffMiddleware, updateEmrPictureGallery)

router.delete('/deleteEmrPictureGallery/:id', staffMiddleware, deleteEmrPictureGallery)

module.exports = router