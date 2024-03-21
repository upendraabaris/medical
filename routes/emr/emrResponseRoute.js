const router = require("express").Router()

const {getEmrResponse, getEmrResponseById, addEmrResponse, updateEmrResponse, deleteEmrResponse, getQuestionnaire} = require("../../controllers/emr/emrResponseCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getEmrResponse)

router.get('/:id', staffMiddleware, getEmrResponseById)

router.post('/addEmrResponse', staffMiddleware, addEmrResponse)

router.put('/updateEmrResponse/:id', staffMiddleware, updateEmrResponse)

router.delete('/deleteEmrResponse/:id', staffMiddleware, deleteEmrResponse)

router.get('/questionnaire', staffMiddleware, getQuestionnaire)

module.exports = router