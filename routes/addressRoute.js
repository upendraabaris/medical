const router = require("express").Router()

const {getAddress, getAddressById, addAddress, updateAddress, deleteAddress} = require("../controllers/addressCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getAddress, responseSend)

router.get('/:id', verifyToken, getAddressById, responseSend)

router.post('/addAddress', verifyToken, addAddress, responseSend)

router.put('/updateAddress/:id', verifyToken, updateAddress, responseSend)

router.delete('/deleteAddress/:id', verifyToken, deleteAddress, responseSend)

module.exports = router