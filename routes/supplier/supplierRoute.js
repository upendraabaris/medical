const router = require("express").Router()

const {getSupplier, getSupplierById, addSupplier, updateSupplier, deleteSupplier} = require("../../controllers/supplier/supplierCtrl")

router.get('/', getSupplier)

router.get('/:id', getSupplierById)

router.post('/addSupplier', addSupplier)

router.put('/updateSupplier/:id', updateSupplier)

router.delete('/deleteSupplier/:id', deleteSupplier)

module.exports = router