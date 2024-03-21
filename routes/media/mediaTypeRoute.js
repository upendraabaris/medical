const router = require("express").Router()

const {getMediaType, getMediaTypeById, addMediaType, updateMediaType, deleteMediaType} = require("../../controllers/media/mediaTypeCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getMediaType)

router.get('/:id', staffMiddleware, getMediaTypeById)

router.post('/addMediaType', staffMiddleware, addMediaType)

router.put('/updateMediaType/:id', staffMiddleware, updateMediaType)

router.delete('/deleteMediaType/:id', staffMiddleware,  deleteMediaType)

module.exports = router