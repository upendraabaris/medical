const router = require("express").Router()
const {getServiceHistory, getServiceHistoryById, addServiceHistory, updateServiceHistory, deleteServiceHistory} = require("../controllers/serviceHistoryCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getServiceHistory, responseSend)

router.get('/:id', verifyToken, getServiceHistoryById, responseSend)

router.post('/addServiceHistory', verifyToken, addServiceHistory, responseSend)

router.put('/updateServiceHistory/:id', verifyToken, updateServiceHistory, responseSend)

router.delete('/deleteServiceHistory/:id', verifyToken, deleteServiceHistory, responseSend)

module.exports = router