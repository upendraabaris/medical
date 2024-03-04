const router = require("express").Router()

const {getService, getServiceById, addService, updateService, deleteService} = require("../../controllers/service/serviceCtrl")

router.get('/', getService)

router.get('/:id', getServiceById)

router.post('/addService', addService)

router.put('/updateService/:id', updateService)

router.delete('/deleteService/:id', deleteService)

module.exports = router