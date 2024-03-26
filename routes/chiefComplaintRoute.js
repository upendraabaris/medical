const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint} = require("../controllers/chiefComplaintCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getChiefComplaint, responseSend)

router.get('/public', staffMiddleware, getChiefComplaint, responseSend)

router.get('/:id', staffMiddleware, getChiefComplaintById, responseSend)

router.post('/addChiefComplaint', staffMiddleware, addChiefComplaint, responseSend)

router.put('/updateChiefComplaint/:id', staffMiddleware, updateChiefComplaint, responseSend)

router.delete('/deleteChiefComplaint/:id', staffMiddleware, deleteChiefComplaint, responseSend)

module.exports = router