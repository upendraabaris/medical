const router = require("express").Router()
const {getNbsuMedication, getNbsuMedicationById, addNbsuMedication, updateNbsuMedication, deleteNbsuMedication} = require("../controllers/nbsuMedicationCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', sellerUserMiddleware, getNbsuMedication, responseSend)

router.get('/:id', staffMiddleware, getNbsuMedicationById, responseSend)

router.post('/add', staffMiddleware, addNbsuMedication, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuMedication, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuMedication, responseSend)

module.exports = router