const router = require("express").Router()

const {getSupplier, getSupplierById, addSupplier, updateSupplier, deleteSupplier} = require("../../controllers/supplier/supplierCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSupplier, responseSend)

router.get('/:id', getSupplierById, responseSend)

router.post('/addSupplier', addSupplier, responseSend)

router.put('/updateSupplier/:id', updateSupplier, responseSend)

router.delete('/deleteSupplier/:id', deleteSupplier, responseSend)

module.exports = router