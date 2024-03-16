const router = require("express").Router()

const {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType} = require("../../controllers/hospital/hospitalClinicTypeCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getHospitalClinicType, responseSend)

router.get('/:id', getHospitalClinicTypeById, responseSend)

router.post('/addHospitalClinicType', addHospitalClinicType, responseSend)

router.put('/updateHospitalClinicType/:id', updateHospitalClinicType, responseSend)

router.delete('/deleteHospitalClinicType/:id', deleteHospitalClinicType, responseSend)

module.exports = router