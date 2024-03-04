const router = require("express").Router()

const {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic} = require("../../controllers/hospital/hospitalClinicCtrl")

router.get('/', getHospitalClinic)

router.get('/:id', getHospitalClinicById)

router.post('/addHospitalClinic', addHospitalClinic)

router.put('/updateHospitalClinic/:id', updateHospitalClinic)

router.delete('/deleteHospitalClinic/:id', deleteHospitalClinic)

module.exports = router