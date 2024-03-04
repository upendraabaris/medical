const router = require("express").Router()

const {getPatientVitalInformation, getPatientVitalInformationById, addPatientVitalInformation, updatePatientVitalInformation, deletePatientVitalInformation} = require("../controllers/patientVitalInfoCtrl")

router.get('/', getPatientVitalInformation)

router.get('/:id', getPatientVitalInformationById)

router.post('/addPatientVitalInfo', addPatientVitalInformation)

router.put('/updatePatientVitalInfo/:id', updatePatientVitalInformation)

router.delete('/deletePatientVitalInfo/:id', deletePatientVitalInformation)

module.exports = router