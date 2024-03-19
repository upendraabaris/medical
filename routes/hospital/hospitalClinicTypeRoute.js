const router = require("express").Router()

const {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType} = require("../../controllers/hospital/hospitalClinicTypeCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getHospitalClinicType, responseSend)

router.get('/:id', verifyToken, getHospitalClinicTypeById, responseSend)

router.post('/addHospitalClinicType', verifyToken, addHospitalClinicType, responseSend)

router.put('/updateHospitalClinicType/:id', verifyToken, updateHospitalClinicType, responseSend)

router.delete('/deleteHospitalClinicType/:id', verifyToken, deleteHospitalClinicType, responseSend)

module.exports = router