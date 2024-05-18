const router = require("express").Router()

const {getAdmissionType, getAdmissionTypeById, addAdmissionType, updateAdmissionType, deleteAdmissionType, deleteAllAdmissionType} = require("../controllers/admissionTypeCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getAdmissionType, responseSend)

router.get('/public', /* staffMiddleware, */ getAdmissionType, responseSend)

router.get('/:id', staffMiddleware, getAdmissionTypeById, responseSend)

router.post('/addAdmissionType', staffMiddleware, addAdmissionType, responseSend)

router.put('/updateAdmissionType/:id', staffMiddleware, updateAdmissionType, responseSend)

router.delete('/deleteAdmissionType/:id', staffMiddleware, deleteAdmissionType, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllAdmissionType, responseSend)

module.exports = router