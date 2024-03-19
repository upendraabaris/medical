const router = require("express").Router()

const {getSosTransaction, getSosTransactionById, addSosTransaction, updateSosTransaction, deleteSosTransaction} = require("../../controllers/sos/sosTransactionCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSosTransaction, responseSend)

router.get('/:id', verifyToken, getSosTransactionById, responseSend)

router.post('/addSosTransaction', verifyToken, addSosTransaction, responseSend)

router.put('/updateSosTransaction/:id', verifyToken, updateSosTransaction, responseSend)

router.delete('/deleteSosTransaction/:id', verifyToken, deleteSosTransaction, responseSend)

module.exports = router