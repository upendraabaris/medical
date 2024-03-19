const router = require("express").Router()

const {getEmrQuestionType, getEmrQuestionTypeById, addEmrQuestionType, updateEmrQuestionType, deleteEmrQuestionType} = require("../../controllers/emr/emrQuestionTypeCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getEmrQuestionType)

router.get('/:id', verifyToken, getEmrQuestionTypeById)

router.post('/addEmrQuestionType', verifyToken, addEmrQuestionType)

router.put('/updateEmrQuestionType/:id', verifyToken, updateEmrQuestionType)

router.delete('/deleteEmrQuestionType/:id', verifyToken, deleteEmrQuestionType)

module.exports = router