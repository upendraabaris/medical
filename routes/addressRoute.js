const router = require("express").Router()

const {getAddress, getAddressById, addAddress, updateAddress, deleteAddress} = require("../controllers/addressCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getAddress, responseSend)

router.get('/:id', getAddressById, responseSend)

router.post('/addAddress', addAddress, responseSend)

router.put('/updateAddress/:id', updateAddress, responseSend)

router.delete('/deleteAddress/:id', deleteAddress, responseSend)

module.exports = router