const router = require("express").Router()
const {getDoctorAttendent, getDoctorAttendentById, addDoctorAttendent, updateDoctorAttendent, deleteDoctorAttendent} = require("../controllers/doctorAttendentCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getDoctorAttendent, responseSend)

router.get('/:id', staffMiddleware, getDoctorAttendentById, responseSend)

router.post('/addDoctorAttendent', staffMiddleware, addDoctorAttendent, responseSend)

router.put('/updateDoctorAttendent/:id', staffMiddleware, updateDoctorAttendent, responseSend)

router.delete('/deleteDoctorAttendent/:id', staffMiddleware, deleteDoctorAttendent, responseSend)

module.exports = router