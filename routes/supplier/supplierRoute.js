const router = require("express").Router()

const {getSupplier, getSupplierById, addSupplier, updateSupplier, deleteSupplier} = require("../../controllers/supplier/supplierCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSupplier, responseSend)

router.get('/:id', verifyToken, getSupplierById, responseSend)

router.post('/addSupplier', verifyToken, addSupplier, responseSend)

router.put('/updateSupplier/:id', verifyToken, updateSupplier, responseSend)

router.delete('/deleteSupplier/:id', verifyToken, deleteSupplier, responseSend)

module.exports = router