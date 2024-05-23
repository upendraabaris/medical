const router = require("express").Router()

const {getProductSupplierMapping, getProductSupplierMappingById, addProductSupplierMapping, updateProductSupplierMapping, deleteProductSupplierMapping} = require("../../controllers/service/productSupplierMappingCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getProductSupplierMapping, responseSend)

router.get('/:id', staffMiddleware, getProductSupplierMappingById, responseSend)

router.post('/add', staffMiddleware, addProductSupplierMapping, responseSend)

router.put('/update/:id', staffMiddleware, updateProductSupplierMapping, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteProductSupplierMapping, responseSend)

module.exports = router