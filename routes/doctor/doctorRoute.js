const router = require("express").Router()

const {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor} = require("../../controllers/doctor/doctorCtrl")

router.get('/', getDoctor)

router.get('/:id', getDoctorById)

router.post('/addDoctor', addDoctor)

router.put('/updateDoctor/:id', updateDoctor)

router.delete('/deleteDoctor/:id', deleteDoctor)

module.exports = router