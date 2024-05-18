const router = require("express").Router()

const {getSosProfile, getSosProfileById, addSosProfile, updateSosProfile, deleteSosProfile, getSosApplicationOfUser, sosProfile, getsosProfile} = require("../../controllers/sos/sosProfileCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSosProfile, responseSend)

router.get('/public', verifyToken, getSosProfile, responseSend)

router.get('/:id', staffMiddleware, getSosProfileById, responseSend)

router.post('/add', /* staffMiddleware, */ addSosProfile, responseSend)

router.put('/updateSosProfile/:id', staffMiddleware, updateSosProfile, responseSend)

router.delete('/deleteSosProfile/:id', staffMiddleware, deleteSosProfile, responseSend)

router.get('/sosdetails/user/:id', getSosApplicationOfUser, responseSend)

router.post('/public/addSosprofile', /* verifyToken, */ sosProfile, responseSend)

router.get('/public/get/:id', /* verifyToken, */ getsosProfile, responseSend)

module.exports = router