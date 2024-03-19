const router = require("express").Router()

const {getEmrResponse, getEmrResponseById, addEmrResponse, updateEmrResponse, deleteEmrResponse, getQuestionnaire} = require("../../controllers/emr/emrResponseCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getEmrResponse)

router.get('/:id', verifyToken, getEmrResponseById)

router.post('/addEmrResponse', verifyToken, addEmrResponse)

router.put('/updateEmrResponse/:id', verifyToken, updateEmrResponse)

router.delete('/deleteEmrResponse/:id', verifyToken, deleteEmrResponse)

router.get('/questionnaire', verifyToken, getQuestionnaire)

module.exports = router