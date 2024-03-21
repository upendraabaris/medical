const router = require("express").Router()

const {getEmrQuestionType, getEmrQuestionTypeById, addEmrQuestionType, updateEmrQuestionType, deleteEmrQuestionType} = require("../../controllers/emr/emrQuestionTypeCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getEmrQuestionType)

router.get('/:id', staffMiddleware, getEmrQuestionTypeById)

router.post('/addEmrQuestionType', staffMiddleware, addEmrQuestionType)

router.put('/updateEmrQuestionType/:id', staffMiddleware, updateEmrQuestionType)

router.delete('/deleteEmrQuestionType/:id', staffMiddleware, deleteEmrQuestionType)

module.exports = router