const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint, deleteAllChiefComplaints, addData, getMedicalConsultant, getChiefComplaintOfNewBorn} = require("../controllers/chiefComplaintCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getChiefComplaint, responseSend)

router.get('/public', verifyToken, getChiefComplaint, responseSend)

router.get('/get/newborn', /* verifyToken, */ getChiefComplaintOfNewBorn, responseSend)


router.post('/addChiefComplaint', staffMiddleware, addChiefComplaint, responseSend)

router.put('/updateChiefComplaint/:id', staffMiddleware, updateChiefComplaint, responseSend)

router.delete('/deleteChiefComplaint/:id', staffMiddleware, deleteChiefComplaint, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllChiefComplaints, responseSend)

router.post('/adddata', addData)

router.get('/getMedicalConsultactQuestion', getMedicalConsultant, responseSend)
router.get('/:id', staffMiddleware, getChiefComplaintById, responseSend)

module.exports = router