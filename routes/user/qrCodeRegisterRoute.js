const router = require("express").Router()

const {getQrCodeRegister, getQrCodeRegisterById, addQrCodeRegister, updateQrCodeRegister, deleteQrCodeRegister} = require("../../controllers/user/qrCodeRegisterCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getQrCodeRegister, responseSend)

router.get('/:id', staffMiddleware, getQrCodeRegisterById, responseSend)

router.post('/addQrCodeRegister', staffMiddleware, addQrCodeRegister, responseSend)

router.put('/updateQrCodeRegister/:id', staffMiddleware, updateQrCodeRegister, responseSend)

router.delete('/deleteQrCodeRegister/:id', staffMiddleware, deleteQrCodeRegister, responseSend)

module.exports = router