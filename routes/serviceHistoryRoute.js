const router = require("express").Router()
const {getServiceHistory, getServiceHistoryById, addServiceHistory, updateServiceHistory, deleteServiceHistory} = require("../controllers/serviceHistoryCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getServiceHistory, responseSend)

router.get('/:id', staffMiddleware, getServiceHistoryById, responseSend)

router.post('/addServiceHistory', staffMiddleware, addServiceHistory, responseSend)

router.put('/updateServiceHistory/:id', staffMiddleware, updateServiceHistory, responseSend)

router.delete('/deleteServiceHistory/:id', staffMiddleware, deleteServiceHistory, responseSend)

module.exports = router