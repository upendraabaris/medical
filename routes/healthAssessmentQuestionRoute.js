const router = require("express").Router()
const {getHealthAssessment, getHealthAssessmentById, addHealthAssessment, updateHealthAssessment, deleteHealthAssessment} = require("../controllers/healthAssessmentQuestionCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getHealthAssessment, responseSend)

router.get('/:id', staffMiddleware, getHealthAssessmentById, responseSend)

router.post('/addHealthAssessment', staffMiddleware, addHealthAssessment, responseSend)

router.put('/updateHealthAssessment/:id', staffMiddleware, updateHealthAssessment, responseSend)

router.delete('/deleteHealthAssessment/:id', staffMiddleware, deleteHealthAssessment, responseSend)

module.exports = router