const router = require("express").Router()
const {getServiceHistory, getServiceHistoryById, addServiceHistory, updateServiceHistory, deleteServiceHistory} = require("../controllers/serviceHistoryCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getServiceHistory, responseSend)

router.get('/:id', getServiceHistoryById, responseSend)

router.post('/addServiceHistory', addServiceHistory, responseSend)

router.put('/updateServiceHistory/:id', updateServiceHistory, responseSend)

router.delete('/deleteServiceHistory/:id', deleteServiceHistory, responseSend)

module.exports = router