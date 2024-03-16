const router = require("express").Router()

const {getSupplierType, getSupplierTypeById, addSupplierType, updateSupplierType, deleteSupplierType} = require("../../controllers/supplier/supplierTypeCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSupplierType, responseSend)

router.get('/:id', getSupplierTypeById, responseSend)

router.post('/addSupplierType', addSupplierType, responseSend)

router.put('/updateSupplierType/:id', updateSupplierType, responseSend)

router.delete('/deleteSupplierType/:id', deleteSupplierType, responseSend)

module.exports = router