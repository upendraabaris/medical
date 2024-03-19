const router = require("express").Router()

const {getService, getServiceById, addService, updateService, deleteService} = require("../../controllers/service/serviceCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getService, responseSend)

router.get('/:id', verifyToken, getServiceById, responseSend)

router.post('/addService', verifyToken, addService, responseSend)

router.put('/updateService/:id', verifyToken, updateService, responseSend)

router.delete('/deleteService/:id', verifyToken, deleteService, responseSend)

module.exports = router