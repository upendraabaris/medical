const router = require("express").Router()

const {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType} = require("../../controllers/hospital/hospitalClinicTypeCtrl")

router.get('/', getHospitalClinicType)

router.get('/:id', getHospitalClinicTypeById)

router.post('/addHospitalClinicType', addHospitalClinicType)

router.put('/updateHospitalClinicType/:id', updateHospitalClinicType)

router.delete('/deleteHospitalClinicType/:id', deleteHospitalClinicType)

module.exports = router