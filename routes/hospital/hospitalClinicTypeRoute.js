const router = require("express").Router()

const {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType} = require("../../controllers/hospital/hospitalClinicTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getHospitalClinicType, responseSend)

router.get('/:id', staffMiddleware, getHospitalClinicTypeById, responseSend)

router.post('/addHospitalClinicType', staffMiddleware, addHospitalClinicType, responseSend)

router.put('/updateHospitalClinicType/:id', staffMiddleware, updateHospitalClinicType, responseSend)

router.delete('/deleteHospitalClinicType/:id', staffMiddleware, deleteHospitalClinicType, responseSend)

module.exports = router