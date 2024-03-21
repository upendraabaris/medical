const router = require("express").Router()

const {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor} = require("../../controllers/doctor/doctorCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDoctor, responseSend)

router.get('/:id', staffMiddleware, getDoctorById, responseSend)

router.post('/addDoctor', staffMiddleware, addDoctor, responseSend)

router.put('/updateDoctor/:id', staffMiddleware, updateDoctor, responseSend)

router.delete('/deleteDoctor/:id', staffMiddleware, deleteDoctor, responseSend)

module.exports = router