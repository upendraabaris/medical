const router = require("express").Router()

const {getEmrPictureGallery, getEmrPictureGalleryById, addEmrPictureGallery, updateEmrPictureGallery, deleteEmrPictureGallery} = require("../../controllers/emr/emrPictureGalleryCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getEmrPictureGallery)

router.get('/:id', verifyToken, getEmrPictureGalleryById)

router.post('/addEmrPictureGallery', verifyToken, addEmrPictureGallery)

router.put('/updateEmrPictureGallery/:id', verifyToken, updateEmrPictureGallery)

router.delete('/deleteEmrPictureGallery/:id', verifyToken, deleteEmrPictureGallery)

module.exports = router