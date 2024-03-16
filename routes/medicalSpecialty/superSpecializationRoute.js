const router = require("express").Router()

const {getSuperSpecialization, getSuperSpecializationById, addSuperSpecialization, updateSuperSpecialization, deleteSuperSpecialization} = require("../../controllers/medicalSpecialty/superSpecializationCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSuperSpecialization, responseSend)

router.get('/:id', getSuperSpecializationById, responseSend)

router.post('/addSuperSpecialization', addSuperSpecialization, responseSend)

router.put('/updateSuperSpecialization/:id', updateSuperSpecialization, responseSend)

router.delete('/deleteSuperSpecialization/:id', deleteSuperSpecialization, responseSend)

module.exports = router