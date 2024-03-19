const router = require("express").Router()

const {getSuperSpecialization, getSuperSpecializationById, addSuperSpecialization, updateSuperSpecialization, deleteSuperSpecialization} = require("../../controllers/medicalSpecialty/superSpecializationCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getSuperSpecialization, responseSend)

router.get('/:id', verifyToken, getSuperSpecializationById, responseSend)

router.post('/addSuperSpecialization', verifyToken, addSuperSpecialization, responseSend)

router.put('/updateSuperSpecialization/:id', verifyToken, updateSuperSpecialization, responseSend)

router.delete('/deleteSuperSpecialization/:id', verifyToken, deleteSuperSpecialization, responseSend)

module.exports = router