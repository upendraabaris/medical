const router = require("express").Router()

const {getProductPostalCodeMapping, getProductPostalCodeMappingById, addProductPostalCodeMapping, updateProductPostalCodeMapping, deleteProductPostalCodeMapping} = require("../../controllers/service/productPostalCodeMappingCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getProductPostalCodeMapping, responseSend)

router.get('/:id', staffMiddleware, getProductPostalCodeMappingById, responseSend)

router.post('/add', staffMiddleware, addProductPostalCodeMapping, responseSend)

router.put('/update/:id', staffMiddleware, updateProductPostalCodeMapping, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteProductPostalCodeMapping, responseSend)

module.exports = router