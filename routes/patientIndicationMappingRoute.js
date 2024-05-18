const router = require("express").Router()
const {getPatientIndicationMapping, getPatientIndicationMappingById, addPatientIndicationMapping, updatePatientIndicationMapping, deletePatientIndicationMapping, deleteAllPatientIndicationMapping} = require("../controllers/patientIndicationMappingCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")
/*  */
router.get('/', staffMiddleware, getPatientIndicationMapping, responseSend)

router.get('/user/:id', sellerUserMiddleware, getPatientIndicationMapping, responseSend)

router.get('/:id', staffMiddleware, getPatientIndicationMappingById, responseSend)

router.post('/add', sellerUserMiddleware, addPatientIndicationMapping, responseSend)

router.put('/update/:id', staffMiddleware, updatePatientIndicationMapping, responseSend)

router.delete('/delete/:id', staffMiddleware, deletePatientIndicationMapping, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllPatientIndicationMapping, responseSend)

module.exports = router