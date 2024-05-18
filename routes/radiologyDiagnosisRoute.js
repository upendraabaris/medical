const router = require("express").Router()
const {getRadiologyDiagnosis, getRadiologyDiagnosisById, addRadiologyDiagnosis, updateRadiologyDiagnosis, deleteRadiologyDiagnosis, deleteAllRadiologyDiagnosis} = require("../controllers/radiologyDiagnosisCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.post('/add', /* staffMiddleware, */ addRadiologyDiagnosis, responseSend)
router.get('/', staffMiddleware, getRadiologyDiagnosis, responseSend)

router.get('/:id', staffMiddleware, getRadiologyDiagnosisById, responseSend)


router.put('/update/:id', staffMiddleware, updateRadiologyDiagnosis, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteRadiologyDiagnosis, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllRadiologyDiagnosis, responseSend)

module.exports = router