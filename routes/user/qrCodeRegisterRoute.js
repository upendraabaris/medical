const router = require("express").Router()

const {getQrCodeRegister, getQrCodeRegisterById, addQrCodeRegister, updateQrCodeRegister, deleteQrCodeRegister} = require("../../controllers/user/qrCodeRegisterCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getQrCodeRegister, responseSend)

router.get('/:id', verifyToken, getQrCodeRegisterById, responseSend)

router.post('/addQrCodeRegister', verifyToken, addQrCodeRegister, responseSend)

router.put('/updateQrCodeRegister/:id', verifyToken, updateQrCodeRegister, responseSend)

router.delete('/deleteQrCodeRegister/:id', verifyToken, deleteQrCodeRegister, responseSend)

module.exports = router