const router = require("express").Router()
const {getPatientVitalInformation, getPatientVitalInformationById, addPatientVitalInformation, updatePatientVitalInformation, deletePatientVitalInformation} = require("../controllers/patientVitalInfoCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getPatientVitalInformation, responseSend)

router.get('/:id', verifyToken, getPatientVitalInformationById, responseSend)

router.post('/addPatientVitalInfo', verifyToken, addPatientVitalInformation, responseSend)

router.post('/public/addPatientVitalInfo', verifyToken, addPatientVitalInformation, responseSend)

router.put('/updatePatientVitalInfo/:id', verifyToken, updatePatientVitalInformation, responseSend)

router.delete('/deletePatientVitalInfo/:id', verifyToken, deletePatientVitalInformation, responseSend)

module.exports = router