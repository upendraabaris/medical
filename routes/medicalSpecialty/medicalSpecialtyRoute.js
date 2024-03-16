const router = require("express").Router()

const {getMedicalSpecialty, getMedicalSpecialtyById, addMedicalSpecialty, updateMedicalSpecialty, deleteMedicalSpecialty} = require("../../controllers/medicalSpecialty/medicalSpecialtyCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getMedicalSpecialty, responseSend)

router.get('/:id', getMedicalSpecialtyById, responseSend)

router.post('/addMedicalSpecialty', addMedicalSpecialty, responseSend)

router.put('/updateMedicalSpecialty/:id', updateMedicalSpecialty, responseSend)

router.delete('/deleteMedicalSpecialty/:id', deleteMedicalSpecialty, responseSend)

module.exports = router