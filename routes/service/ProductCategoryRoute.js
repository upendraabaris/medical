const router = require("express").Router()

const {getProductCategory, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory} = require("../../controllers/service/ProductCategoryCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/get', staffMiddleware, getProductCategory, responseSend)

router.get('/public/get', verifyToken, getProductCategory, responseSend)

router.get('/:id', staffMiddleware, getProductCategoryById, responseSend)

router.post('/add', staffMiddleware, addProductCategory, responseSend)

router.put('/update/:id', staffMiddleware, updateProductCategory, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteProductCategory, responseSend)

module.exports = router