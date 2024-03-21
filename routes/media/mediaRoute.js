const router = require("express").Router()

const {getMedia, getMediaById, addMedia, updateMedia, deleteMedia} = require("../../controllers/media/mediaCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getMedia)

router.get('/:id', staffMiddleware, getMediaById)

router.post('/addMedia', staffMiddleware, addMedia)

router.put('/updateMedia/:id', staffMiddleware, updateMedia)

router.delete('/deleteMedia/:id', staffMiddleware, deleteMedia)

module.exports = router