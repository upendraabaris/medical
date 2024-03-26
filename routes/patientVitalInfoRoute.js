const router = require("express").Router()
const {getPatientVitalInformation, getPatientVitalInformationById, addPatientVitalInformation, updatePatientVitalInformation, deletePatientVitalInformation, deleteAllVitalInformation} = require("../controllers/patientVitalInfoCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getPatientVitalInformation, responseSend)

router.get('/:id', staffMiddleware, getPatientVitalInformationById, responseSend)

router.post('/addPatientVitalInfo', staffMiddleware, addPatientVitalInformation, responseSend)

router.post('/public/addPatientVitalInfo', staffMiddleware, addPatientVitalInformation, responseSend)

router.put('/updatePatientVitalInfo/:id', staffMiddleware, updatePatientVitalInformation, responseSend)

router.delete('/deletePatientVitalInfo/:id', staffMiddleware, deletePatientVitalInformation, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllVitalInformation, responseSend)

module.exports = router