const router = require("express").Router()

const {getMediaType, getMediaTypeById, addMediaType, updateMediaType, deleteMediaType} = require("../../controllers/media/mediaTypeCtrl")

router.get('/', getMediaType)

router.get('/:id', getMediaTypeById)

router.post('/addMediaType', addMediaType)

router.put('/updateMediaType/:id', updateMediaType)

router.delete('/deleteMediaType/:id', deleteMediaType)

module.exports = router