const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint} = require("../controllers/chiefComplaintCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getChiefComplaint, responseSend)

router.get('/:id', verifyToken, getChiefComplaintById, responseSend)

router.post('/addChiefComplaint', verifyToken, addChiefComplaint, responseSend)

router.put('/updateChiefComplaint/:id', verifyToken, updateChiefComplaint, responseSend)

router.delete('/deleteChiefComplaint/:id', verifyToken, deleteChiefComplaint, responseSend)

module.exports = router