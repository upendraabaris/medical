const router = require("express").Router()

const {getSosTransaction, getSosTransactionById, addSosTransaction, updateSosTransaction, deleteSosTransaction} = require("../../controllers/sos/sosTransactionCtrl")

router.get('/', getSosTransaction)

router.get('/:id', getSosTransactionById)

router.post('/addSosTransaction', addSosTransaction)

router.put('/updateSosTransaction/:id', updateSosTransaction)

router.delete('/deleteSosTransaction/:id', deleteSosTransaction)

module.exports = router