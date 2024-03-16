const router = require("express").Router()

const {getQrCodeRegister, getQrCodeRegisterById, addQrCodeRegister, updateQrCodeRegister, deleteQrCodeRegister} = require("../../controllers/user/qrCodeRegisterCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getQrCodeRegister, responseSend)

router.get('/:id', getQrCodeRegisterById, responseSend)

router.post('/addQrCodeRegister', addQrCodeRegister, responseSend)

router.put('/updateQrCodeRegister/:id', updateQrCodeRegister, responseSend)

router.delete('/deleteQrCodeRegister/:id', deleteQrCodeRegister, responseSend)

module.exports = router