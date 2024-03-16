const router = require("express").Router()
const {getPatientVitalInformation, getPatientVitalInformationById, addPatientVitalInformation, updatePatientVitalInformation, deletePatientVitalInformation} = require("../controllers/patientVitalInfoCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getPatientVitalInformation, responseSend)

router.get('/:id', getPatientVitalInformationById, responseSend)

router.post('/addPatientVitalInfo', addPatientVitalInformation, responseSend)

router.put('/updatePatientVitalInfo/:id', updatePatientVitalInformation, responseSend)

router.delete('/deletePatientVitalInfo/:id', deletePatientVitalInformation, responseSend)

module.exports = router