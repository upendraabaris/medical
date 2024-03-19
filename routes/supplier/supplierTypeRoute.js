const router = require("express").Router()

const {getSupplierType, getSupplierTypeById, addSupplierType, updateSupplierType, deleteSupplierType} = require("../../controllers/supplier/supplierTypeCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSupplierType, responseSend)

router.get('/:id', verifyToken, getSupplierTypeById, responseSend)

router.post('/addSupplierType', verifyToken, addSupplierType, responseSend)

router.put('/updateSupplierType/:id', verifyToken, updateSupplierType, responseSend)

router.delete('/deleteSupplierType/:id', verifyToken, deleteSupplierType, responseSend)

module.exports = router