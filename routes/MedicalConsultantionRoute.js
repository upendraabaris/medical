const router = require("express").Router()
const {getMedicalConsultant, getMedicalConsultantBySymptom} = require("../controllers/MedicalConsultationCtrl")
const {responseSend} = require("../utils/response")

// // const {verifyToken} = require("../middleware/authMiddleware")
// const {staffMiddleware} = require("../middleware/authMiddleware")

// router.get('/', staffMiddleware, getLanguage, responseSend)

// router.get('/:id', staffMiddleware, getLanguageById, responseSend)

// router.post('/addLanguage',  addLanguage, responseSend)

// router.put('/updateLanguage/:id', staffMiddleware, updateLanguage, responseSend)

// router.delete('/deleteLanguage/:id', staffMiddleware, deleteLanguage, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllLanguage, responseSend)

router.get('/getMedicalConsultactQuestion', getMedicalConsultant, responseSend)

// router.get('/getMedicalConsultantByCategory/:category/:symptomId', getMedicalConsultantByCategory, responseSend)
router.post('/getMedicalConsultantBySymptom', getMedicalConsultantBySymptom, responseSend)


module.exports = router