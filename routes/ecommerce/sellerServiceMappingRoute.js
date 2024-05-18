const router = require("express").Router()

const {getSellerServiceMapping, getSellerServiceMappingById, addSellerServiceMapping, updateSellerServiceMapping, deleteSellerServiceMapping, pagination} = require("../../controllers/ecommerce/sellerServiceMappingCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSellerServiceMapping, responseSend)

router.get('/:id', staffMiddleware, getSellerServiceMappingById, responseSend)

router.post('/addSellerServiceMapping', staffMiddleware, addSellerServiceMapping, responseSend)

router.put('/updateSellerServiceMapping/:id', staffMiddleware, updateSellerServiceMapping, responseSend)

router.delete('/deleteSellerServiceMapping/:id', staffMiddleware, deleteSellerServiceMapping, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router