const router = require("express").Router()
const {getGeneralExamination, getGeneralExaminationById, addGeneralExamination, updateGeneralExamination, deleteGeneralExamination, getGeneralExaminationVitalInfo} = require("../controllers/generalExaminationCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getGeneralExamination, responseSend)

router.get('/user/:id', /* sellerUserMiddleware, */ getGeneralExamination, responseSend)

router.get('/user/vitalinfo/:id', /* sellerUserMiddleware, */ getGeneralExaminationVitalInfo, responseSend)

router.get('/:id', staffMiddleware, getGeneralExaminationById, responseSend)

router.post('/add', sellerUserMiddleware, addGeneralExamination, responseSend)

router.put('/updateGeneralExamination/:id', staffMiddleware, updateGeneralExamination, responseSend)

router.delete('/deleteGeneralExamination/:id', staffMiddleware, deleteGeneralExamination, responseSend)

module.exports = router