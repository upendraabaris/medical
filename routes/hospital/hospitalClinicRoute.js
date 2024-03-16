const router = require("express").Router()

const {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic} = require("../../controllers/hospital/hospitalClinicCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getHospitalClinic, responseSend)

router.get('/:id', getHospitalClinicById, responseSend)

router.post('/addHospitalClinic', addHospitalClinic, responseSend)

router.put('/updateHospitalClinic/:id', updateHospitalClinic, responseSend)

router.delete('/deleteHospitalClinic/:id', deleteHospitalClinic, responseSend)

module.exports = router