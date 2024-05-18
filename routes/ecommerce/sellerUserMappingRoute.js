const router = require("express").Router()

const {getSellerUserMapping, getSellerUserMappingById, addSellerUserMapping, updateSellerUserMapping, deleteSellerUserMapping, pagination} = require("../../controllers/ecommerce/sellerUserMappingCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/get/:id', /* staffMiddleware, */ getSellerUserMapping, responseSend)

router.get('/:id', staffMiddleware, getSellerUserMappingById, responseSend)

router.post('/addSellerUserMapping', staffMiddleware, addSellerUserMapping, responseSend)

router.put('/updateSellerUserMapping/:id', staffMiddleware, updateSellerUserMapping, responseSend)

router.delete('/deleteSellerUserMapping/:id', staffMiddleware, deleteSellerUserMapping, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router