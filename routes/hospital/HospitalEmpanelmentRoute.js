const router = require("express").Router()

const {getHospitalEmpanelment, getHospitalEmpanelmentById, addHospitalEmpanelment, updateHospitalEmpanelment, deleteHospitalEmpanelment, deleteAllHospitalEmpanelment} = require("../../controllers/hospital/HospitalEmpanelmentCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getHospitalEmpanelment, responseSend)

router.get('/public', verifyToken, getHospitalEmpanelment, responseSend)

router.get('/:id', staffMiddleware, getHospitalEmpanelmentById, responseSend)

router.post('/addHospitalEmpanelment', staffMiddleware, addHospitalEmpanelment, responseSend)

router.put('/updateHospitalEmpanelment/:id', staffMiddleware, updateHospitalEmpanelment, responseSend)

router.delete('/deleteHospitalEmpanelment/:id', staffMiddleware, deleteHospitalEmpanelment, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllHospitalEmpanelment, responseSend)

module.exports = router