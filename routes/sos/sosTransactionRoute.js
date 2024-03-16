const router = require("express").Router()

const {getSosTransaction, getSosTransactionById, addSosTransaction, updateSosTransaction, deleteSosTransaction} = require("../../controllers/sos/sosTransactionCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSosTransaction, responseSend)

router.get('/:id', getSosTransactionById, responseSend)

router.post('/addSosTransaction', addSosTransaction, responseSend)

router.put('/updateSosTransaction/:id', updateSosTransaction, responseSend)

router.delete('/deleteSosTransaction/:id', deleteSosTransaction, responseSend)

module.exports = router