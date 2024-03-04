const router = require("express").Router()

const {getEmrQuestionType, getEmrQuestionTypeById, addEmrQuestionType, updateEmrQuestionType, deleteEmrQuestionType} = require("../../controllers/emr/emrQuestionTypeCtrl")

router.get('/', getEmrQuestionType)

router.get('/:id', getEmrQuestionTypeById)

router.post('/addEmrQuestionType', addEmrQuestionType)

router.put('/updateEmrQuestionType/:id', updateEmrQuestionType)

router.delete('/deleteEmrQuestionType/:id', deleteEmrQuestionType)

module.exports = router