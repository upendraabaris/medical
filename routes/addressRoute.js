const router = require("express").Router()

const {getAddress, getAddressById, addAddress, updateAddress, deleteAddress, deleteAllAddress, OptInUsersForWhatsapp} = require("../controllers/addressCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

// router.get('/', staffMiddleware, getAddress, responseSend)

// router.get('/:id', staffMiddleware, getAddressById, responseSend)

// router.post('/addAddress', staffMiddleware, addAddress, responseSend)

// router.put('/updateAddress/:id', staffMiddleware, updateAddress, responseSend)

// router.delete('/deleteAddress/:id', staffMiddleware, deleteAddress, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllAddress, responseSend)

router.get('/send-sms', OptInUsersForWhatsapp)

module.exports = router