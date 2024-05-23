const router = require("express").Router()
const {getNbsuPatient, getNbsuPatientById, addNbsuPatient, updateNbsuPatient, deleteNbsuPatient, getNbsuPatientParticularById, addMedicalData} = require("../controllers/nbsuPatientCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/getdatabyhealthfacility/:id', sellerUserMiddleware, getNbsuPatient, responseSend)

router.get('/user/:id', sellerUserMiddleware, getNbsuPatientById, responseSend)

router.get('/single/get/:id', sellerUserMiddleware, getNbsuPatientParticularById, responseSend)

router.post('/addNbsuPatient/public', sellerUserMiddleware, addNbsuPatient, responseSend)

router.put('/updateNbsuPatient/:id', staffMiddleware, updateNbsuPatient, responseSend)

router.delete('/deleteNbsuPatient/:id', staffMiddleware, deleteNbsuPatient, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllNbsuPatientType, responseSend)

router.post('/addMedicalData', sellerUserMiddleware,addMedicalData, responseSend)

module.exports = router
