const router = require("express").Router()

const {getMedicalSpecialty, getMedicalSpecialtyById, addMedicalSpecialty, updateMedicalSpecialty, deleteMedicalSpecialty} = require("../../controllers/medicalSpecialty/medicalSpecialtyCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getMedicalSpecialty, responseSend)

router.get('/:id', verifyToken, getMedicalSpecialtyById, responseSend)

router.post('/addMedicalSpecialty', verifyToken, addMedicalSpecialty, responseSend)

router.put('/updateMedicalSpecialty/:id', verifyToken, updateMedicalSpecialty, responseSend)

router.delete('/deleteMedicalSpecialty/:id', verifyToken, deleteMedicalSpecialty, responseSend)

module.exports = router