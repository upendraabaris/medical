const router = require("express").Router()
const {getMedication, getMedicationById, addMedication, updateMedication, deleteMedication} = require("../controllers/medicationCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', sellerUserMiddleware, getMedication, responseSend)

router.get('/:id', staffMiddleware, getMedicationById, responseSend)

router.post('/add', staffMiddleware, addMedication, responseSend)

router.put('/update/:id', staffMiddleware, updateMedication, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteMedication, responseSend)

module.exports = router