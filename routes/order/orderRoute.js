const router = require("express").Router()

const {getOrder, getOrderById, addOrder, updateOrder, deleteOrder} = require("../../controllers/order/orderCtrl")

router.get('/', getOrder)

router.get('/:id', getOrderById)

router.post('/addOrder', addOrder)

router.put('/updateOrder/:id', updateOrder)

router.delete('/deleteOrder/:id', deleteOrder)

module.exports = router