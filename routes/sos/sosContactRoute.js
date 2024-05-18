const router = require("express").Router()

const {getSosContact, getSosContactById, addSosContact, updateSosContact, deleteSosContact, getSosApplicationOfUser} = require("../../controllers/sos/sosContactCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSosContact, responseSend)

router.get('/public', verifyToken, getSosContact, responseSend)

router.get('/:id', staffMiddleware, getSosContactById, responseSend)

router.post('/add', /* staffMiddleware, */ addSosContact, responseSend)

router.put('/updateSosContact/:id', staffMiddleware, updateSosContact, responseSend)

router.delete('/deleteSosContact/:id', staffMiddleware, deleteSosContact, responseSend)

// router.get('/sosdetails/user/:id', getSosApplicationOfUser, responseSend)

module.exports = router