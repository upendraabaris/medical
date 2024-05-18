const router = require("express").Router()

const {getOrderType, getOrderTypeById, addOrderType, updateOrderType, deleteOrderType} = require("../../controllers/ecommerce/orderTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getOrderType, responseSend)

router.get('/:id', staffMiddleware, getOrderTypeById, responseSend)

router.post('/addOrderType', staffMiddleware, addOrderType, responseSend)

router.put('/updateOrderType/:id', staffMiddleware, updateOrderType, responseSend)

router.delete('/deleteOrderType/:id', staffMiddleware, deleteOrderType, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllOrderType, responseSend)

module.exports = router