const router = require("express").Router()

const {getSubSpeciality, getSubSpecialityById, addSubSpeciality, updateSubSpeciality, deleteSubSpeciality} = require("../../controllers/medicalSpecialty/subSpecialityCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSubSpeciality, responseSend)

router.get('/public', verifyToken, getSubSpeciality, responseSend)

router.get('/:id', staffMiddleware, getSubSpecialityById, responseSend)

router.post('/addSubSpeciality', staffMiddleware, addSubSpeciality, responseSend)

router.put('/updateSubSpeciality/:id', staffMiddleware, updateSubSpeciality, responseSend)

router.delete('/deleteSubSpeciality/:id', staffMiddleware, deleteSubSpeciality, responseSend)

module.exports = router