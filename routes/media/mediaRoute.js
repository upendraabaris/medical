const router = require("express").Router()

const {getMedia, getMediaById, addMedia, updateMedia, deleteMedia} = require("../../controllers/media/mediaCtrl")

router.get('/', getMedia)

router.get('/:id', getMediaById)

router.post('/addMedia', addMedia)

router.put('/updateMedia/:id', updateMedia)

router.delete('/deleteMedia/:id', deleteMedia)

module.exports = router