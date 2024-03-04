const router = require("express").Router()

const {getAddress, getAddressById, addAddress, updateAddress, deleteAddress} = require("../controllers/addressCtrl")

router.get('/', getAddress)

router.get('/:id', getAddressById)

router.post('/addAddress', addAddress)

router.put('/updateAddress/:id', updateAddress)

router.delete('/deleteAddress/:id', deleteAddress)

module.exports = router