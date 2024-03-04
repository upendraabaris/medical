const router = require("express").Router()

const {getSuperSpecialization, getSuperSpecializationById, addSuperSpecialization, updateSuperSpecialization, deleteSuperSpecialization} = require("../../controllers/medicalSpecialty/superSpecializationCtrl")

router.get('/', getSuperSpecialization)

router.get('/:id', getSuperSpecializationById)

router.post('/addSuperSpecialization', addSuperSpecialization)

router.put('/updateSuperSpecialization/:id', updateSuperSpecialization)

router.delete('/deleteSuperSpecialization/:id', deleteSuperSpecialization)

module.exports = router