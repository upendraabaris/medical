const router = require("express").Router()
const {getResuscitation, getResuscitationById, addResuscitation, updateResuscitation, deleteResuscitation, deleteAllResuscitation} = require("../controllers/resuscitationCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getResuscitation, responseSend)

router.get('/:id', staffMiddleware, getResuscitationById, responseSend)

router.post('/add', /* staffMiddleware, */ addResuscitation, responseSend)

router.put('/updateResuscitation/:id', staffMiddleware, updateResuscitation, responseSend)

router.delete('/deleteResuscitation/:id', staffMiddleware, deleteResuscitation, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllResuscitation, responseSend)

module.exports = router