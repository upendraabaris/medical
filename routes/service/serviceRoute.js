const router = require("express").Router()

const {getService, getServiceById, addService, updateService, deleteService} = require("../../controllers/service/serviceCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getService, responseSend)

router.get('/:id', staffMiddleware, getServiceById, responseSend)

router.post('/addService', staffMiddleware, addService, responseSend)

router.put('/updateService/:id', staffMiddleware, updateService, responseSend)

router.delete('/deleteService/:id', staffMiddleware, deleteService, responseSend)

module.exports = router