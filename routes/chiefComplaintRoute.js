const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint, deleteAllChiefComplaints} = require("../controllers/chiefComplaintCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getChiefComplaint, responseSend)

router.get('/public', verifyToken, getChiefComplaint, responseSend)

router.get('/:id', staffMiddleware, getChiefComplaintById, responseSend)

router.post('/addChiefComplaint', staffMiddleware, addChiefComplaint, responseSend)

router.put('/updateChiefComplaint/:id', staffMiddleware, updateChiefComplaint, responseSend)

router.delete('/deleteChiefComplaint/:id', staffMiddleware, deleteChiefComplaint, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllChiefComplaints, responseSend)

module.exports = router