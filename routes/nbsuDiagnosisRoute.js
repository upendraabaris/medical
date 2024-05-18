const router = require("express").Router()
const {getNbsuDiagnosisMapping, getNbsuDiagnosisMappingById, addNbsuDiagnosisMapping, updateNbsuDiagnosisMapping, deleteNbsuDiagnosisMapping, deleteAllNbsuDiagnosisMapping} = require("../controllers/nbsuDiagnosisCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getNbsuDiagnosisMapping, responseSend)

router.get('/user/:id', sellerUserMiddleware, getNbsuDiagnosisMapping, responseSend)

router.get('/:id', staffMiddleware, getNbsuDiagnosisMappingById, responseSend)

router.post('/add', sellerUserMiddleware, addNbsuDiagnosisMapping, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuDiagnosisMapping, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuDiagnosisMapping, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllNbsuDiagnosisMapping, responseSend)

module.exports = router