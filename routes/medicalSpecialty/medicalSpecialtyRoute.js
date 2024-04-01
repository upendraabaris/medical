const router = require("express").Router()

const {getMedicalSpecialty, getMedicalSpecialtyById, addMedicalSpecialty, updateMedicalSpecialty, deleteMedicalSpecialty} = require("../../controllers/medicalSpecialty/medicalSpecialtyCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getMedicalSpecialty, responseSend)

router.get('/public', verifyToken , getMedicalSpecialty, responseSend)

router.get('/:id', staffMiddleware, getMedicalSpecialtyById, responseSend)

router.post('/addMedicalSpecialty', staffMiddleware, addMedicalSpecialty, responseSend)

router.put('/updateMedicalSpecialty/:id', staffMiddleware, updateMedicalSpecialty, responseSend)

router.delete('/deleteMedicalSpecialty/:id', staffMiddleware, deleteMedicalSpecialty, responseSend)

module.exports = router