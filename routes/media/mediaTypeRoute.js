const router = require("express").Router()

const {getMediaType, getMediaTypeById, addMediaType, updateMediaType, deleteMediaType} = require("../../controllers/media/mediaTypeCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getMediaType)

router.get('/:id', verifyToken, getMediaTypeById)

router.post('/addMediaType', verifyToken, addMediaType)

router.put('/updateMediaType/:id', verifyToken, updateMediaType)

router.delete('/deleteMediaType/:id', verifyToken,  deleteMediaType)

module.exports = router