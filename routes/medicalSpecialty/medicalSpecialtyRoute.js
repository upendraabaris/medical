const router = require("express").Router()

const {getMedicalSpecialty, getMedicalSpecialtyById, addMedicalSpecialty, updateMedicalSpecialty, deleteMedicalSpecialty} = require("../../controllers/medicalSpecialty/medicalSpecialtyCtrl")

router.get('/', getMedicalSpecialty)

router.get('/:id', getMedicalSpecialtyById)

router.post('/addMedicalSpecialty', addMedicalSpecialty)

router.put('/updateMedicalSpecialty/:id', updateMedicalSpecialty)

router.delete('/deleteMedicalSpecialty/:id', deleteMedicalSpecialty)

module.exports = router