const router = require("express").Router()

const {getSupplierType, getSupplierTypeById, addSupplierType, updateSupplierType, deleteSupplierType} = require("../../controllers/supplier/supplierTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSupplierType, responseSend)

router.get('/:id', staffMiddleware, getSupplierTypeById, responseSend)

router.post('/addSupplierType', staffMiddleware, addSupplierType, responseSend)

router.put('/updateSupplierType/:id', staffMiddleware, updateSupplierType, responseSend)

router.delete('/deleteSupplierType/:id', staffMiddleware, deleteSupplierType, responseSend)

module.exports = router