const router = require("express").Router()

const {getSupplier, getSupplierById, addSupplier, updateSupplier, deleteSupplier} = require("../../controllers/supplier/supplierCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSupplier, responseSend)

router.get('/:id', staffMiddleware, getSupplierById, responseSend)

router.post('/addSupplier', staffMiddleware, addSupplier, responseSend)

router.put('/updateSupplier/:id', staffMiddleware, updateSupplier, responseSend)

router.delete('/deleteSupplier/:id', staffMiddleware, deleteSupplier, responseSend)

module.exports = router