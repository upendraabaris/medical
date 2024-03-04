const router = require("express").Router()

const {getOrderStatus, getOrderStatusById, addOrderStatus, updateOrderStatus, deleteOrderStatus} = require("../../controllers/order/orderStatusCtrl")

router.get('/', getOrderStatus)

router.get('/:id', getOrderStatusById)

router.post('/addOrderStatus', addOrderStatus)

router.put('/updateOrderStatus/:id', updateOrderStatus)

router.delete('/deleteOrderStatus/:id', deleteOrderStatus)

module.exports = router