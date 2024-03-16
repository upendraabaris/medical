const router = require("express").Router()

const {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor} = require("../../controllers/doctor/doctorCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getDoctor, responseSend)

router.get('/:id', getDoctorById, responseSend)

router.post('/addDoctor', addDoctor, responseSend)

router.put('/updateDoctor/:id', updateDoctor, responseSend)

router.delete('/deleteDoctor/:id', deleteDoctor, responseSend)

module.exports = router