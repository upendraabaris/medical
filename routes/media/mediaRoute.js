const router = require("express").Router()

const {getMedia, getMediaById, addMedia, updateMedia, deleteMedia} = require("../../controllers/media/mediaCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getMedia)

router.get('/:id', verifyToken, getMediaById)

router.post('/addMedia', verifyToken, addMedia)

router.put('/updateMedia/:id', verifyToken, updateMedia)

router.delete('/deleteMedia/:id', verifyToken, deleteMedia)

module.exports = router