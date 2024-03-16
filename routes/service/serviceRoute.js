const router = require("express").Router()

const {getService, getServiceById, addService, updateService, deleteService} = require("../../controllers/service/serviceCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getService, responseSend)

router.get('/:id', getServiceById, responseSend)

router.post('/addService', addService, responseSend)

router.put('/updateService/:id', updateService, responseSend)

router.delete('/deleteService/:id', deleteService, responseSend)

module.exports = router