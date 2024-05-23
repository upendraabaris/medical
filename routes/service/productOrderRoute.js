const router = require("express").Router()

const {getProductOrder, getProductOrderById, addProductOrder, updateProductOrder, deleteProductOrder} = require("../../controllers/service/productOrderCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getProductOrder, responseSend)

router.get('/:id', staffMiddleware, getProductOrderById, responseSend)

router.post('/add', staffMiddleware, addProductOrder, responseSend)

router.put('/update/:id', staffMiddleware, updateProductOrder, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteProductOrder, responseSend)

module.exports = router