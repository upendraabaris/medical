const router = require("express").Router()
const {getClinicalDiagnosis, getClinicalDiagnosisById, addClinicalDiagnosis, updateClinicalDiagnosis, deleteClinicalDiagnosis} = require("../controllers/clinicalDiagnosisCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getClinicalDiagnosis, responseSend)

router.get('/public', getClinicalDiagnosis, responseSend)

router.get('/:id', staffMiddleware, getClinicalDiagnosisById, responseSend)

router.post('/add', /* staffMiddleware, */ addClinicalDiagnosis, responseSend)

router.put('/update/:id', staffMiddleware, updateClinicalDiagnosis, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteClinicalDiagnosis, responseSend)

module.exports = router