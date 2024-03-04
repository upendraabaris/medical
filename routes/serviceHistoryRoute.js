const router = require("express").Router()

const {getServiceHistory, getServiceHistoryById, addServiceHistory, updateServiceHistory, deleteServiceHistory} = require("../controllers/serviceHistoryCtrl")

router.get('/', getServiceHistory)

router.get('/:id', getServiceHistoryById)

router.post('/addServiceHistory', addServiceHistory)

router.put('/updateServiceHistory/:id', updateServiceHistory)

router.delete('/deleteServiceHistory/:id', deleteServiceHistory)

module.exports = router