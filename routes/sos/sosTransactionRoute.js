const router = require("express").Router()

const {getSosTransaction, getSosTransactionById, addSosTransaction, updateSosTransaction, deleteSosTransaction} = require("../../controllers/sos/sosTransactionCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSosTransaction, responseSend)

router.get('/:id', staffMiddleware, getSosTransactionById, responseSend)

router.post('/public/addSosTransaction', verifyToken, addSosTransaction, responseSend)

router.put('/updateSosTransaction/:id', staffMiddleware, updateSosTransaction, responseSend)

router.delete('/deleteSosTransaction/:id', staffMiddleware, deleteSosTransaction, responseSend)

module.exports = router