const router = require("express").Router()
const {getPresumptiveDiagnosis, getPresumptiveDiagnosisById, addPresumptiveDiagnosis, updatePresumptiveDiagnosis, deletePresumptiveDiagnosis, deleteAllPresumptiveDiagnosis} = require("../controllers/presumptiveDiagnosisCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")
/*  */
router.get('/', staffMiddleware, getPresumptiveDiagnosis, responseSend)

router.get('/:id', staffMiddleware, getPresumptiveDiagnosisById, responseSend)

router.post('/add', staffMiddleware, addPresumptiveDiagnosis, responseSend)

router.put('/update/:id', staffMiddleware, updatePresumptiveDiagnosis, responseSend)

router.delete('/delete/:id', staffMiddleware, deletePresumptiveDiagnosis, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllPresumptiveDiagnosis, responseSend)

module.exports = router