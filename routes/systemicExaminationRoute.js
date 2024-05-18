const router = require("express").Router()
const {getSystemicExamination, getSystemicExaminationById, addSystemicExamination, updateSystemicExamination, deleteSystemicExamination} = require("../controllers/systemicExaminationCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getSystemicExamination, responseSend)

router.get('/user/:id', /* staffMiddleware, */ getSystemicExamination, responseSend)

router.get('/:id', staffMiddleware, getSystemicExaminationById, responseSend)

router.post('/add', sellerUserMiddleware, addSystemicExamination, responseSend)

router.put('/update/:id', sellerUserMiddleware, updateSystemicExamination, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteSystemicExamination, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllSystemicExamination, responseSend)

module.exports = router