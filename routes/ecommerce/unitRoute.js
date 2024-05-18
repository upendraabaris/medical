const router = require("express").Router()

const {getUnit, getUnitById, addUnit, updateUnit, deleteUnit, pagination} = require("../../controllers/ecommerce/unitCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUnit, responseSend)

router.get('/:id', staffMiddleware, getUnitById, responseSend)

router.post('/addUnit', staffMiddleware, addUnit, responseSend)

router.put('/updateUnit/:id', staffMiddleware, updateUnit, responseSend)

router.delete('/deleteUnit/:id', staffMiddleware, deleteUnit, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router