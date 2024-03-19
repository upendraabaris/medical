const router = require("express").Router()

const {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor} = require("../../controllers/doctor/doctorCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getDoctor, responseSend)

router.get('/:id', verifyToken, getDoctorById, responseSend)

router.post('/addDoctor', verifyToken, addDoctor, responseSend)

router.put('/updateDoctor/:id', verifyToken, updateDoctor, responseSend)

router.delete('/deleteDoctor/:id', verifyToken, deleteDoctor, responseSend)

module.exports = router