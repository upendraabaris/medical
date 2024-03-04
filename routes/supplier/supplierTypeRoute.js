const router = require("express").Router()

const {getSupplierType, getSupplierTypeById, addSupplierType, updateSupplierType, deleteSupplierType} = require("../../controllers/supplier/supplierTypeCtrl")

router.get('/', getSupplierType)

router.get('/:id', getSupplierTypeById)

router.post('/addSupplierType', addSupplierType)

router.put('/updateSupplierType/:id', updateSupplierType)

router.delete('/deleteSupplierType/:id', deleteSupplierType)

module.exports = router