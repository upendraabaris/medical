const router = require("express").Router()

const {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic, getFavorite} = require("../../controllers/hospital/hospitalClinicCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getHospitalClinic, responseSend)

router.get('/public', verifyToken , getHospitalClinic, responseSend)

router.get('/:id', staffMiddleware, getHospitalClinicById, responseSend)

router.get('/public/:id', verifyToken, getHospitalClinicById, responseSend)

router.post('/addHospitalClinic', staffMiddleware, addHospitalClinic, responseSend)

router.put('/updateHospitalClinic/:id', staffMiddleware, updateHospitalClinic, responseSend)

router.delete('/deleteHospitalClinic/:id', staffMiddleware, deleteHospitalClinic, responseSend)

router.get('/getfavorite/:id', staffMiddleware, getFavorite, responseSend)

module.exports = router