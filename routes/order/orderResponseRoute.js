const router = require("express").Router()

const {getOrderResponse, getOrderResponseById, addOrderResponse, updateOrderResponse, deleteOrderResponse} = require("../../controllers/order/orderResponseCtrl")

router.get('/', getOrderResponse)

router.get('/:id', getOrderResponseById)

router.post('/addOrderResponse', addOrderResponse)

router.put('/updateOrderResponse/:id', updateOrderResponse)

router.delete('/deleteOrderResponse/:id', deleteOrderResponse)

module.exports = router