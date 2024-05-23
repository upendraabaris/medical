const router = require("express").Router()

const {getProduct, getProductById, addProduct, updateProduct, deleteProduct, getProductByCategory} = require("../../controllers/service/productCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getProduct, responseSend)

router.get('/public/get',verifyToken, getProduct, responseSend)

router.get('/:id', staffMiddleware, getProductById, responseSend)

router.post('/add', /* staffMiddleware, */ addProduct, responseSend)

router.put('/update/:id', staffMiddleware, updateProduct, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteProduct, responseSend)

router.post('/getProductByCategory', verifyToken, getProductByCategory, responseSend)

module.exports = router