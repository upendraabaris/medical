const router = require("express").Router()

const {getSellerEngagementMapping, getSellerEngagementMappingById, addSellerEngagementMapping, updateSellerEngagementMapping, deleteSellerEngagementMapping, pagination} = require("../../controllers/ecommerce/sellerEngagementMappingCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/get/:id', /* staffMiddleware, */ getSellerEngagementMapping, responseSend)

// router.get('/:id', staffMiddleware, getSellerEngagementMappingById, responseSend)

router.post('/addSellerEngagement', staffMiddleware, addSellerEngagementMapping, responseSend)

router.put('/updateSellerEngagement/:id', staffMiddleware, updateSellerEngagementMapping, responseSend)

router.delete('/deleteSellerEngagement/:id', staffMiddleware, deleteSellerEngagementMapping, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router