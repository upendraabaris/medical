const router = require("express").Router()

const {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor, getFavorite, getDoctorPublic} = require("../../controllers/doctor/doctorCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDoctor, responseSend)

router.get('/:id', staffMiddleware, getDoctorById, responseSend)

router.post('/addDoctor', staffMiddleware, addDoctor, responseSend)

router.put('/updateDoctor/:id', staffMiddleware, updateDoctor, responseSend)

router.delete('/deleteDoctor/:id', staffMiddleware, deleteDoctor, responseSend)

router.get('/getfavorite/:id', staffMiddleware, getFavorite, responseSend)

router.get('/public/getfavorite/:id', verifyToken, getFavorite, responseSend)

router.get('/public/pageList', verifyToken, getDoctorPublic, responseSend)

module.exports = router