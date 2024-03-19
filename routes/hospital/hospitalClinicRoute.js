const router = require("express").Router()

const {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic, getFavorite} = require("../../controllers/hospital/hospitalClinicCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getHospitalClinic, responseSend)

router.get('/public', verifyToken, getHospitalClinic, responseSend)

router.get('/:id', verifyToken, getHospitalClinicById, responseSend)

router.post('/addHospitalClinic', verifyToken, addHospitalClinic, responseSend)

router.put('/updateHospitalClinic/:id', verifyToken, updateHospitalClinic, responseSend)

router.delete('/deleteHospitalClinic/:id', verifyToken, deleteHospitalClinic, responseSend)

router.get('/getfavorite/:id', verifyToken, getFavorite, responseSend)

module.exports = router