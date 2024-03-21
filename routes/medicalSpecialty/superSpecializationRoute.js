const router = require("express").Router()

const {getSuperSpecialization, getSuperSpecializationById, addSuperSpecialization, updateSuperSpecialization, deleteSuperSpecialization} = require("../../controllers/medicalSpecialty/superSpecializationCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSuperSpecialization, responseSend)

router.get('/:id', staffMiddleware, getSuperSpecializationById, responseSend)

router.post('/addSuperSpecialization', staffMiddleware, addSuperSpecialization, responseSend)

router.put('/updateSuperSpecialization/:id', staffMiddleware, updateSuperSpecialization, responseSend)

router.delete('/deleteSuperSpecialization/:id', staffMiddleware, deleteSuperSpecialization, responseSend)

module.exports = router