const router = require("express").Router()

const {getOrderResponseType, getOrderResponseTypeById, addOrderResponseType, updateOrderResponseType, deleteOrderResponseType} = require("../../controllers/order/OrderResponseTypeCtrl")

router.get('/', getOrderResponseType)

router.get('/:id', getOrderResponseTypeById)

router.post('/addOrderResponseType', addOrderResponseType)

router.put('/updateOrderResponseType/:id', updateOrderResponseType)

router.delete('/deleteOrderResponseType/:id', deleteOrderResponseType)

module.exports = router