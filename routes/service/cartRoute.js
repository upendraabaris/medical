const router = require("express").Router()

const {getCart, getCartById, addCart, updateCart, deleteCart, getCartByCategory} = require("../../controllers/service/cartCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getCart, responseSend)

router.get('/public/get',verifyToken, getCart, responseSend)

router.get('/:id', staffMiddleware, getCartById, responseSend)

router.post('/add', verifyToken, addCart, responseSend)

router.post('/public/add', verifyToken, addCart, responseSend)

router.put('/update/:id', staffMiddleware, updateCart, responseSend)
router.put('/public/update/:productId', verifyToken, updateCart, responseSend)

router.delete('/public/delete/:productId', verifyToken, deleteCart, responseSend)

// router.post('/getCartByCategory', getCartByCategory, responseSend)

module.exports = router