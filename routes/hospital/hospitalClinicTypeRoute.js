const router = require("express").Router()

const {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType, deleteAllHospitalClinicType} = require("../../controllers/hospital/hospitalClinicTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getHospitalClinicType, responseSend)

router.get('/public', verifyToken, getHospitalClinicType, responseSend)

router.get('/:id', staffMiddleware, getHospitalClinicTypeById, responseSend)

router.post('/addHospitalClinicType', staffMiddleware, addHospitalClinicType, responseSend)

router.put('/updateHospitalClinicType/:id', staffMiddleware, updateHospitalClinicType, responseSend)

router.delete('/deleteHospitalClinicType/:id', staffMiddleware, deleteHospitalClinicType, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllHospitalClinicType, responseSend)

module.exports = router